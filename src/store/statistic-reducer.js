import {statisticAPI} from "../DAL/api";
import {DATE} from "../DAL/date";
import {CANVAS} from "../DAL/canvas";

const TOGGLE_LOADING = 'TOGGLE-LOADING';
const SET_COUNTRIES_DATA = 'SET-COUNTRIES-DATA';
const SET_CURRENT_COUNTRY = 'SET-CURRENT-COUNTRY';
const SET_PERIOD = 'SET-PERIOD';
const SET_PERIOD_BY_FIRST_DAY = 'SET_PERIOD_BY_FIRST_DAY';
const SET_VALUES = 'SET-VALUES';
const SET_TYPE = 'SET-TYPE';
const SET_MOUSE_XY = 'SET-MOUSE-XY';

const SET_MOUSE_HOVER_CANVAS = 'SET-MOUSE-HOVER-CANVAS';
const SET_DATE_END = 'SET-DATE-END';
const SET_CASE_TYPE = 'SET-CASE-TYPE';
const SET_CURRENT_VALUES = 'SET-CURRENT-VALUES';
const SET_SHOW_INFO = 'SET_SHOW_INFO';

let stateInitial = {
    isLoading: false,
    // [{Country: 'Country', Slug: 'Slug', ISO2: 'ISO2'}, ...]
    countriesData: [], // Список названий, слагов стран и ISO2
    periodInput: 14, // 7, 14, 30, -1 значение из input select
    periodByFirstDay: null, // вычисленное с первого дня до текеущего
    period: 14, // результирующее значение для всех типов (в днях)
    dateEnd: null, // последняя актуальная дата (в формате API)
    dates: null,// массив дат в формате DD.MM
    currentCountry: 'Russian Federation', //'Australia', // выбранная страна
    valuesConfirmedNew: [], // [['DD MM YYYY', value], ....] new === by day
    valuesConfirmedTotal: [], // [['DD MM YYYY', value], ....]
    valuesRecoveredNew: [], // [['DD MM YYYY', value], ....] new === by day
    valuesRecoveredTotal: [], // [['DD MM YYYY', value], ....]
    valuesDeathsNew: [], // [['DD MM YYYY', value], ....] new === by day
    valuesDeathsTotal: [], // [['DD MM YYYY', value], ....]
    type: 'byDay', // 'byDay', 'total'
    mouseX: null,
    mouseY: null,
    mouseHoverCanvas: false, // курсор над канвасом,
    caseType: 'confirmed', // 'confirmed', 'recovered', 'deaths'
    // зависит от type и caseType
    // изменение происходит в getInitial, getValues - после получения данных с сервера
    // в getInitial значения type и caseType из stateInitial
    // в getValues - текущие выбранные
    // также изменение в setCurrentValues без API запроса, по уже полученным данным
    // в зависимости от выбранных параметров type и caseType
    valuesCurrent: null,
    showInfo: false, // показывать или нет
    infoValue: null, // значение
    infoDate: null, // дата
    xPoint: null, // координаты точки и линии
    yPoint: null  // координаты точки и линии

};

const statisticReducer = (state = stateInitial, action) => {
    switch (action.type) {

        // переключение статуса загрузки
        case TOGGLE_LOADING: {
            return {...state, isLoading: action.isLoading}
        }

        case SET_COUNTRIES_DATA: {
            action.countriesData.sort((a, b) => {
                if (a.Country > b.Country) {
                    return 1;
                }
                if (a.Country < b.Country) {
                    return -1;
                }
                return 0;
            })
            return {...state, countriesData: action.countriesData};
        }

        // установка выбранной страны
        case SET_CURRENT_COUNTRY: {
            return {...state, currentCountry: action.country};
        }

        // установка периода
        case SET_PERIOD: {
            return {...state, periodInput: +action.period, period: +action.period}
        }

        // установка периода от начала до текущей даты
        case SET_PERIOD_BY_FIRST_DAY: {
            return {...state, periodByFirstDay: action.data.length, period: action.data.length}
        }

        // установка актуальной даты конца периода
        // установка массив дат в формате DD.MM для canvas
        case SET_DATE_END: {
            let dateEnd = action.data[action.data.length - 1].Date;
            //let dates = DATE.getDates(state.period, dateEnd)
            return {...state, dateEnd: dateEnd} //, dates: dates
        }

        case SET_VALUES: {
            let valuesConfirmedNew = [];
            let valuesConfirmedTotal = [];
            let valuesRecoveredNew = [];
            let valuesRecoveredTotal = [];
            let valuesDeathsNew = [];
            let valuesDeathsTotal = [];
            let dates = [];
            // если period=7,14,30, длина массива данных равно period+1 для получения значений разницы (за один день)
            let i0; //индекс начала итерации
            if (action.values.length <= 31) {
                i0 = 1;
            } else {
                i0 = 0;
            }
            for (let i = i0; i < action.values.length; i++) {
                // заполнение  массива dates - Date: "2020-07-11T00:00:00Z"
                let day = action.values[i].Date.slice(8, 10);
                let month = action.values[i].Date.slice(5, 7);
                dates.push(`${day}.${month}`);

                if (i0 === 0 && i === 0) {
                    valuesConfirmedNew.push(action.values[i].Confirmed);
                    valuesConfirmedTotal.push(action.values[i].Confirmed);
                    valuesRecoveredNew.push(action.values[i].Recovered);
                    valuesRecoveredTotal.push(action.values[i].Recovered);
                    valuesDeathsNew.push(action.values[i].Deaths);
                    valuesDeathsTotal.push(action.values[i].Deaths);
                } else {
                    // проверка присланных данных на ошибки
                    // может быть общее послед. меньше, чем общее предыдущее
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
            // текущее выбранное
            let valuesCurrent = [];
            if (action.typeTime === 'byDay' && action.caseType === 'confirmed') {
                valuesCurrent = valuesConfirmedNew
            }
            if (action.typeTime === 'total' && action.caseType === 'confirmed') {
                valuesCurrent = valuesConfirmedTotal
            }
            if (action.typeTime === 'byDay' && action.caseType === 'recovered') {
                valuesCurrent = valuesRecoveredNew
            }
            if (action.typeTime === 'total' && action.caseType === 'recovered') {
                valuesCurrent = valuesRecoveredTotal
            }
            if (action.typeTime === 'byDay' && action.caseType === 'deaths') {
                valuesCurrent = valuesDeathsNew
            }
            if (action.typeTime === 'total' && action.caseType === 'deaths') {
                valuesCurrent = valuesDeathsTotal
            }
            return {
                ...state,
                valuesConfirmedNew: valuesConfirmedNew,
                valuesRecoveredNew: valuesRecoveredNew,
                valuesDeathsNew: valuesDeathsNew,
                valuesConfirmedTotal: valuesConfirmedTotal,
                valuesRecoveredTotal: valuesRecoveredTotal,
                valuesDeathsTotal: valuesDeathsTotal,
                valuesCurrent: valuesCurrent,
                dates: dates
            };
        }

        case SET_TYPE: {
            return {...state, type: action.typeValue}
        }

        case SET_MOUSE_XY: {
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
            let valueMin = Math.min.apply(null, state.valuesCurrent.filter(el => el !== null));
            let valueMax = Math.max.apply(null, state.valuesCurrent.filter(el => el !== null));
            let DELTA = valueMax - valueMin;
            let deltaGridY = CANVAS.deltaGridYf(DELTA); // шаг координатной сетки по оси Y
            let valueMinGrid = deltaGridY * Math.floor(valueMin / deltaGridY);
            let valueMaxGrid = deltaGridY * (Math.ceil(valueMax / deltaGridY) + 0 * 1);
            let deltaX = (CANVAS.canvasW() - CANVAS.marginLeftX - CANVAS.marginRightX - CANVAS.paddingLeftX) / (state.period - 1);
            let deltaY = (CANVAS.canvasH() - CANVAS.marginY) / (valueMaxGrid - valueMinGrid);

            let canvasX = (i) => {
                return CANVAS.marginLeftX + CANVAS.paddingLeftX + i * deltaX;
            };

            let canvasY = (value) => {
                return CANVAS.canvasH() - CANVAS.marginY - deltaY * (value - valueMinGrid);
            }

            let iPoint = Math.round((action.mouseX - CANVAS.paddingLeftX - CANVAS.marginLeftX) / deltaX);
            let xPoint = canvasX(iPoint);// координата вертикальной линии и точки
            let yPoint;// координата точки
            if (state.valuesCurrent[iPoint] !== null) {
                yPoint = canvasY(state.valuesCurrent[iPoint]);
            } else {
                yPoint = null;
            }
            let infoValue = state.valuesCurrent[iPoint];
            if (infoValue === null) {
                infoValue = 'no data';
            }
            let infoDate = state.dates[iPoint];

            return {
                ...state, mouseX: action.mouseX, mouseY: action.mouseY,
                showInfo: showInfo, infoValue: infoValue, infoDate: infoDate,
                xPoint: xPoint, yPoint: yPoint
            }
        }

        case SET_MOUSE_HOVER_CANVAS: {
            return {...state, mouseHoverCanvas: action.value}
        }

        case SET_CASE_TYPE: {
            return {...state, caseType: action.caseType}
        }

        case SET_CURRENT_VALUES: {
            // action.typeTime
            // action.caseType
            let values;
            if (action.typeTime === 'byDay' && action.caseType === 'confirmed') {
                values = state.valuesConfirmedNew
            }
            if (action.typeTime === 'total' && action.caseType === 'confirmed') {
                values = state.valuesConfirmedTotal
            }
            if (action.typeTime === 'byDay' && action.caseType === 'recovered') {
                values = state.valuesRecoveredNew
            }
            if (action.typeTime === 'total' && action.caseType === 'recovered') {
                values = state.valuesRecoveredTotal
            }
            if (action.typeTime === 'byDay' && action.caseType === 'deaths') {
                values = state.valuesDeathsNew
            }
            if (action.typeTime === 'total' && action.caseType === 'deaths') {
                values = state.valuesDeathsTotal
            }
            return {...state, valuesCurrent: values}
        }

        case SET_SHOW_INFO: {
            return {...state, showInfo: action.showInfo}
        }

        default:
            return state;
    }
};

export const toggleLoading = (isLoading) => ({type: TOGGLE_LOADING, isLoading});
export const setCountriesData = (countriesData) => ({type: SET_COUNTRIES_DATA, countriesData});
export const setCurrentCountry = (country) => ({type: SET_CURRENT_COUNTRY, country});
export const setPeriod = (period) => ({type: SET_PERIOD, period});
export const setPeriodByFirstDay = (data) => ({type: SET_PERIOD_BY_FIRST_DAY, data});
export const setDateEnd = (data) => ({type: SET_DATE_END, data});
export const setValues = (values, type, caseType) => ({type: SET_VALUES, values, typeTime: type, caseType});
export const setType = (typeValue) => ({type: SET_TYPE, typeValue});
export const setMouseXY = (mouseX, mouseY) => ({type: SET_MOUSE_XY, mouseX, mouseY});
export const setMouseHoverCanvas = (value) => ({type: SET_MOUSE_HOVER_CANVAS, value});
export const setCaseType = (caseType) => ({type: SET_CASE_TYPE, caseType});
export const setCurrentValues = (type, caseType) => ({type: SET_CURRENT_VALUES, typeTime: type, caseType});
export const setShowInfo = (showInfo) => ({type: SET_SHOW_INFO, showInfo});

// 1 - получение списка стран, 2 - получение актуальной последней даты, 3 - получить значения
export const getInitial = (period, country, type, caseType) => dispatch => {
    dispatch(toggleLoading(true));
    statisticAPI.getCountries()
        .then(data => {
            dispatch(setCountriesData(data));
            return statisticAPI.getDateEnd(country)
        })
        .then(data => {
            dispatch(setDateEnd(data));
            let dateEndAPI = data[data.length - 1].Date;//API
            let dateEndJS = DATE.dateAPIToJs(dateEndAPI);
            // массив values имеет длину period + 1 для определения величины за день
            // valuesDay[0] = valuesTotal[0] - valuesTotal[-1]
            // для этого начальная дата в запросе меньше на день
            let dateStartJS = new Date(dateEndJS.getTime() - (period) * 24 * 60 * 60 * 1000);
            let dateStartAPI = DATE.dateJsToAPI(dateStartJS);
            return statisticAPI.getValues(country, dateStartAPI, dateEndAPI)
        })
        .then(data => {
            dispatch(setValues(data, type, caseType));
            dispatch(toggleLoading(false));
        })
}

export const getValues = (dateEnd, period, country, type, caseType) => dispatch => {
    dispatch(toggleLoading(true));

    if (period === 7 || period === 14 || period === 30) {
        let dateEndJS = DATE.dateAPIToJs(dateEnd);
        let dateStartJS = new Date(dateEndJS.getTime() - (period) * 24 * 60 * 60 * 1000);
        let dateStartAPI = DATE.dateJsToAPI(dateStartJS);
        statisticAPI.getValues(country, dateStartAPI, dateEnd)
            .then(data => {
                dispatch(setValues(data, type, caseType));
                dispatch(toggleLoading(false));
            })
    } else {
        console.log('getValuesFromDayOne')
        statisticAPI.getValuesFromDayOne(country)
            .then(data => {
                dispatch(setPeriodByFirstDay(data));
                dispatch(setValues(data, type, caseType));
                dispatch(toggleLoading(false));
            })
    }

}

export default statisticReducer;