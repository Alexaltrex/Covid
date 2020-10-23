import {summaryAPI} from "../DAL/api";
import {BaseThunkType, GetActionsType} from "./store";
import {CountryCasesType, SummaryCountryType} from "../types/types";
import {appAC, AppActionsType} from "./app-reducer";

let initialState = {
    date: '', // последняя актуальная дата сбора данных (из API)
    summaryCases: null as null | CountryCasesType, // объект значений суммарного (по всему миру) числа случаев
    countriesCases: null as null | Array<SummaryCountryType>,// массив информации по странам
    countriesList: [] as Array<string>, //список названий стран
    currentCountry: "Russian Federation" // название выбранной страны
};

export type initialStateType = typeof initialState;
type SummaryActionsType = GetActionsType<typeof summaryAC>
type ThunkType = BaseThunkType<SummaryActionsType | AppActionsType>

const summaryReducer = (state = initialState, action: SummaryActionsType): initialStateType => {
    switch (action.type) {
        case 'SUMMARY/SET_DATE': {
            return {...state, date: action.date}
        }
        case 'SUMMARY/SET_SUMMARY_CASES': {
           return {...state, summaryCases: action.summaryCases}
        }
        case 'SUMMARY/SET_COUNTRIES_CASES': {
            return {...state, countriesCases: action.countriesCases}
        }
        case 'SUMMARY/SET_CURRENT_COUNTRY': {
            return {...state, currentCountry: action.country};
        }
        case 'SUMMARY/SET_COUNTRIES_LIST': {
            let countriesList = [];
            for (let i = 0; i < action.countriesCases.length; i++) {
                countriesList.push(action.countriesCases[i].Country);
            }
            return {...state, countriesList: countriesList};
        }
        default:
            return state;
    }
};

export const summaryAC = {
    setDate: (date: string) => ({type: 'SUMMARY/SET_DATE', date} as const),
    setSummaryCases: (summaryCases: CountryCasesType) => ({type: 'SUMMARY/SET_SUMMARY_CASES', summaryCases} as const),
    setCountriesCases: (countriesCases: Array<SummaryCountryType>) => ({type: 'SUMMARY/SET_COUNTRIES_CASES', countriesCases} as const),
    setCurrentCountry: (country: string) => ({type: 'SUMMARY/SET_CURRENT_COUNTRY', country} as const),
    setCountriesList: (countriesCases: Array<SummaryCountryType>) => ({type: 'SUMMARY/SET_COUNTRIES_LIST', countriesCases} as const),
 };

export const getSummary = (): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        const data = await summaryAPI.getSummary();
                dispatch(summaryAC.setDate(data.Date));
                dispatch(summaryAC.setSummaryCases(data.Global));
                dispatch(summaryAC.setCountriesCases(data.Countries));
                dispatch(summaryAC.setCountriesList(data.Countries));
    } catch (e) {
        console.log(e)
        appAC.setLanError(true);
    } finally {
        dispatch(appAC.toggleLoading(false));
    }

};

export default summaryReducer;

