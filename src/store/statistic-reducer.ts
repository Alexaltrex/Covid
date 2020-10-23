import {statisticAPI} from "../DAL/api";
import {DATE} from "../helpers/date";
import {CANVAS} from "../helpers/canvas";
import {appAC, AppActionsType} from "./app-reducer";
import {BaseThunkType, GetActionsType} from "./store";
import {
    ByDayOrTotalType,
    CaseTypeType,
    CountryCasesByDayType,
    CountryType,
    PeriodType,
    StatisticFormValuesType,
    typeType
} from "../types/types";

let initialState = {
    countriesData: null as null | Array<CountryType>, // Список названий стран, слагов стран и ISO2
    period: 14, // результирующее значение для всех типов (в днях): formValues.period | periodByFirstDay ---> period
    dateEnd: null as null | string, // последняя актуальная дата (в формате API)
    dates: [] as Array<string>,// массив дат в формате DD.MM
    allValues: {
        confirmed: {
            byDay: {values: [] as Array<number | null>},// массив значений (по дням) - подтвержденные - за день
            total: {values: [] as Array<number | null>},// массив значений (по дням) - подтвержденные - общее количество
        },
        recovered: {
            byDay: {values: [] as Array<number | null>},// массив значений (по дням) - вылеченные - за день
            total: {values: [] as Array<number | null>},// массив значений (по дням) - вылеченные - общее количество
        },
        deaths: {
            byDay: {values: [] as Array<number | null>},// массив значений (по дням) - умершие - за день
            total: {values: [] as Array<number | null>},// массив значений (по дням) - умершие - общее количество
        },
    },
    mouseX: 0, // координаты курсора относительно Canvas (меняются когда курсор над Canvas)
    mouseY: 0, // координаты курсора относительно Canvas
    mouseHoverCanvas: false, // курсор над канвасом,
    // valuesCurrent зависит от country, period, byDayOrTotal и caseType
    // при изменении country или period - загрузка с сервера - getValues (getInitial - при инициализации)
    // при неизменности country или period и изменении byDayOrTotal или caseType - получить из стора - setCurrentValues
    valuesCurrent: [] as Array<number | null>, // массив значений текущего выбранного типа
    showInfo: false, // показывать или нет модальное окно со значением
    infoValue: null as null | number, // выводимое в модальном окне значение
    infoDate: null as null | string, // выводимая в модальном окне дата
    xPoint: 0, // координаты точки на графике и линии
    yPoint: 0 as number | null,  // координаты точки на графике и линии
    isInitialized: false, // инициализация: список стран, крайняя дата, значения для параметров ворму по умолчанию
    formValues: { // значения из формы
        country: 'russia',
        period: '14' as PeriodType, // '7', '14', '30', '-1' (с начала)
        byDayOrTotal: 'byDay' as typeType,
        caseType: 'confirmed' as CaseTypeType,
    },
};

export type initialStateType = typeof initialState;
type StatisticActionsType = GetActionsType<typeof statisticAC>
type ThunkType = BaseThunkType<StatisticActionsType | AppActionsType>

const statisticReducer = (state = initialState, action: StatisticActionsType): initialStateType => {
    switch (action.type) {
        case 'statistic/SET_INITIALIZED': {
            return {...state, isInitialized: true}
        }
        case 'statistic/SET_FORM_VALUES': {
            return {...state, formValues: action.formValues}
        }
        case 'statistic/SET_COUNTRIES_DATA': {
            action.countriesData.sort((a, b) => {
                if (a.Country > b.Country) {
                    return 1;
                }
                if (a.Country < b.Country) {
                    return -1;
                }
                return 0;
            });
            return {...state, countriesData: action.countriesData};
        }
        case 'statistic/SET_PERIOD': {
            return {...state, period: action.period}
        }
        case 'statistic/SET_DATE_END': { // установка актуальной даты конца периода
            return {...state, dateEnd: action.dateEnd} //, dates: dates
        }
        case 'statistic/SET_DATES': { // установка массив дат в формате DD.MM для canvas
            let dates = [] as Array<string>;
            // если period=7,14,30, длина массива данных равно period + 1 для получения значений разницы (за один день)
            const i0 = action.values.length <= 31 ? 1 : 0; //индекс начала итерации
            for (let i = i0; i < action.values.length; i++) { // заполнение  массива dates
                dates.push(DATE.dateTranslateFromApiToGraph(action.values[i].Date));// "2020-07-11T00:00:00Z" ---> '07.11'
            }
            return {...state, dates: dates}
        }
        case 'statistic/SET_VALUES': {
            let valuesConfirmedNew = [] as Array<number | null>;
            let valuesConfirmedTotal = [] as Array<number | null>;
            let valuesRecoveredNew = [] as Array<number | null>;
            let valuesRecoveredTotal = [] as Array<number | null>;
            let valuesDeathsNew = [] as Array<number | null>;
            let valuesDeathsTotal = [] as Array<number | null>;
            // если period=7,14,30, длина массива данных равно period+1 для получения значений разницы (за один день)
            const i0 = action.values.length <= 31 ? 1 : 0; //индекс начала итерации
            for (let i = i0; i < action.values.length; i++) {
                if (i0 === 0 && i === 0) {
                    valuesConfirmedNew.push(action.values[i].Confirmed);
                    valuesConfirmedTotal.push(action.values[i].Confirmed);
                    valuesRecoveredNew.push(action.values[i].Recovered);
                    valuesRecoveredTotal.push(action.values[i].Recovered);
                    valuesDeathsNew.push(action.values[i].Deaths);
                    valuesDeathsTotal.push(action.values[i].Deaths);
                } else {
                    // проверка присланных данных на ошибки
                    // может быть общее послед. меньше, чем общее предыдущее, тогда устанавливаем null
                    if (action.values[i].Confirmed >= action.values[i - 1].Confirmed) {
                        valuesConfirmedTotal.push(action.values[i].Confirmed);
                        valuesConfirmedNew.push(action.values[i].Confirmed - action.values[i - 1].Confirmed);
                    } else {
                        valuesConfirmedTotal.push(null);
                        valuesConfirmedNew.push(null);
                    }

                    if (action.values[i].Recovered >= action.values[i - 1].Recovered) {
                        valuesRecoveredTotal.push(action.values[i].Recovered);
                        valuesRecoveredNew.push(action.values[i].Recovered - action.values[i - 1].Recovered);
                    } else {
                        valuesRecoveredTotal.push(null);
                        valuesRecoveredNew.push(null);
                    }

                    if (action.values[i].Deaths >= action.values[i - 1].Deaths) {
                        valuesDeathsTotal.push(action.values[i].Deaths);
                        valuesDeathsNew.push(action.values[i].Deaths - action.values[i - 1].Deaths);
                    } else {
                        valuesDeathsTotal.push(null);
                        valuesDeathsNew.push(null);
                    }
                }
            }
            const allValues = {
                confirmed: {
                    byDay: {values: valuesConfirmedNew},
                    total: {values: valuesConfirmedTotal},
                },
                recovered: {
                    byDay: {values: valuesRecoveredNew},
                    total: {values: valuesRecoveredTotal},
                },
                deaths: {
                    byDay: {values: valuesDeathsNew},
                    total: {values: valuesDeathsTotal},
                },
            };
            // текущее выбранное
            const valuesCurrent = allValues[action.caseType][action.byDayOrTotal].values;
            return {
                ...state,
                valuesCurrent: valuesCurrent,
                allValues: allValues
            };
        }
        case 'statistic/SET_MOUSE_XY': {
            let showInfo;
            // определение надо ли показывать Info
            if (action.mouseX > CANVAS.marginLeftX + CANVAS.paddingLeftX
                && action.mouseX < CANVAS.canvasW() - CANVAS.marginRightX
                && action.mouseY < CANVAS.canvasH() - CANVAS.marginY) {
                showInfo = true;
            } else {
                showInfo = false;
            }
            // определение infoValue и infoDate, определение координат вертикальной линии и точки
            const valueMin = Math.min.apply(null, (state.valuesCurrent as Array<number>).filter(el => el !== null)) as number;
            const valueMax = Math.max.apply(null, (state.valuesCurrent as Array<number>).filter(el => el !== null)) as number;
            const DELTA = valueMax - valueMin;
            const deltaGridY = CANVAS.deltaGridYf(DELTA); // шаг координатной сетки по оси Y
            const valueMinGrid = deltaGridY * Math.floor(valueMin / deltaGridY);
            const valueMaxGrid = deltaGridY * (Math.ceil(valueMax / deltaGridY) + 0 * 1);
            const deltaX = (CANVAS.canvasW() - CANVAS.marginLeftX - CANVAS.marginRightX - CANVAS.paddingLeftX) / (state.period - 1);
            const deltaY = (CANVAS.canvasH() - CANVAS.marginY) / (valueMaxGrid - valueMinGrid);
            const canvasX = (i: number): number => {
                return CANVAS.marginLeftX + CANVAS.paddingLeftX + i * deltaX;
            };
            const canvasY = (value: number): number => {
                return CANVAS.canvasH() - CANVAS.marginY - deltaY * (value - valueMinGrid);
            };
            const iPoint = Math.round((action.mouseX - CANVAS.paddingLeftX - CANVAS.marginLeftX) / deltaX);
            const xPoint = canvasX(iPoint);// координата вертикальной линии и точки
            let yPoint;// координата точки
            if ((state.valuesCurrent as Array<number>)[iPoint] !== null) {
                yPoint = canvasY((state.valuesCurrent as Array<number>)[iPoint]);
            } else {
                yPoint = null;
            }
            let infoValue: number | null | string = (state.valuesCurrent as Array<number | null>)[iPoint];
            // if (infoValue === null) {
            //     infoValue = 'no data';
            // }
            const infoDate = state.dates && state.dates[iPoint];
            return {
                ...state, mouseX: action.mouseX, mouseY: action.mouseY,
                showInfo: showInfo, infoValue: infoValue, infoDate: infoDate,
                xPoint: xPoint, yPoint: yPoint
            }
        }
        case 'statistic/SET_MOUSE_HOVER_CANVAS': {
            return {...state, mouseHoverCanvas: action.mouseHoverCanvas}
        }
        case 'statistic/SET_CURRENT_VALUES': {
            const valuesCurrent = state.allValues[action.caseType][action.byDayOrTotal].values;
            return {...state, valuesCurrent: valuesCurrent}
        }
        case 'statistic/SET_SHOW_INFO': {
            return {...state, showInfo: action.showInfo}
        }
        default:
            return state;
    }
};

export const statisticAC = {
    setInitialized: () => ({type: 'statistic/SET_INITIALIZED'} as const),
    setFormValues: (formValues: StatisticFormValuesType) => ({type: 'statistic/SET_FORM_VALUES', formValues} as const),
    setCountriesData: (countriesData: Array<CountryType>) => ({
        type: 'statistic/SET_COUNTRIES_DATA',
        countriesData
    } as const),
    setPeriod: (period: number) => ({type: 'statistic/SET_PERIOD', period} as const),
    setDateEnd: (dateEnd: string) => ({type: 'statistic/SET_DATE_END', dateEnd} as const),
    setDates: (values: Array<CountryCasesByDayType>) => ({type: 'statistic/SET_DATES', values} as const),
    setValues: (values: Array<CountryCasesByDayType>, byDayOrTotal: ByDayOrTotalType, caseType: CaseTypeType) => ({
        type: 'statistic/SET_VALUES',
        values,
        byDayOrTotal,
        caseType
    } as const),
    setMouseXY: (mouseX: number, mouseY: number) => ({type: 'statistic/SET_MOUSE_XY', mouseX, mouseY} as const),
    setMouseHoverCanvas: (mouseHoverCanvas: boolean) => ({
        type: 'statistic/SET_MOUSE_HOVER_CANVAS',
        mouseHoverCanvas
    } as const),
    setCurrentValues: (byDayOrTotal: ByDayOrTotalType, caseType: CaseTypeType) => ({
        type: 'statistic/SET_CURRENT_VALUES',
        byDayOrTotal,
        caseType
    } as const),
    setShowInfo: (showInfo: boolean) => ({type: 'statistic/SET_SHOW_INFO', showInfo} as const)
};


// 1 - получение списка стран, 2 - получение актуальной последней даты, 3 - получить значения
export const getInitial = (period: PeriodType, country: string, byDayOrTotal: ByDayOrTotalType, caseType: CaseTypeType): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        // 1 - получение списка стран
        const getCountriesResponse = await statisticAPI.getCountries()
        dispatch(statisticAC.setCountriesData(getCountriesResponse));
        // 2 - получение актуальной последней даты
        const dateEndAPI = await statisticAPI.getDateEnd(country)
        //let dateEndAPI = getDateEndResponse[getDateEndResponse.length - 1].Date;//API
        dispatch(statisticAC.setDateEnd(dateEndAPI));
        let dateEndJS = DATE.dateAPIToJs(dateEndAPI);
        // массив values имеет длину period + 1 для определения величины за день
        // valuesDay[0] = valuesTotal[0] - valuesTotal[-1]
        // для этого начальная дата в запросе меньше на день
        let dateStartJS = new Date(dateEndJS.getTime() - (+period) * 24 * 60 * 60 * 1000);
        let dateStartAPI = DATE.dateJsToAPI(dateStartJS);
        // 3 - получить значения
        const getValuesByPeriodResponse = await statisticAPI.getValuesByPeriod(country, dateStartAPI, dateEndAPI)
        dispatch(statisticAC.setValues(getValuesByPeriodResponse, byDayOrTotal, caseType));
        dispatch(statisticAC.setDates(getValuesByPeriodResponse)); // установить массив дат
        // 4 - окончательно - проинициализировать
        dispatch(statisticAC.setInitialized())
    } catch (e) {
        console.log(e);
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }

}

export const getValues = (dateEnd: string, period: PeriodType, country: string, byDayOrTotal: ByDayOrTotalType, caseType: CaseTypeType): ThunkType => async (dispatch) => {
    try {
       console.log('getValues')
        dispatch(appAC.toggleLoading(true));
        if (period === '7' || period === '14' || period === '30') {
            let dateEndJS = DATE.dateAPIToJs(dateEnd);
            let dateStartJS = new Date(dateEndJS.getTime() - (+period) * 24 * 60 * 60 * 1000);
            let dateStartAPI = DATE.dateJsToAPI(dateStartJS);
            const data = await statisticAPI.getValuesByPeriod(country, dateStartAPI, dateEnd)
            dispatch(statisticAC.setValues(data, byDayOrTotal, caseType)); // установить значения
            dispatch(statisticAC.setDates(data)); // установить даты
        } else { // period === '-1'
            //console.log('getValuesFromDayOne')
            const data = await statisticAPI.getValuesFromDayOne(country)
            dispatch(statisticAC.setPeriod(data.length));
            dispatch(statisticAC.setValues(data, byDayOrTotal, caseType)); // установить значения
            dispatch(statisticAC.setDates(data)); // установить массив дат
        }
    } catch (e) {
        console.log(e)
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export default statisticReducer;