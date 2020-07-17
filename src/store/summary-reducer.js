import {summaryAPI} from "../DAL/api";

const TOGGLE_LOADING = 'TOGGLE-LOADING';
const SET_DATE = 'SET_DATE';
const SET_GLOBAL = 'SET-GLOBAL';
const SET_COUNTRIES = 'SET-COUNTRIES';
const SET_COUNTRIES_LIST = 'SET_COUNTRIES_LIST';
const SET_CURRENT_COUNTRY = 'SET-CURRENT-COUNTRY';
const INITIAL_SET_CASES = 'INITIAL-SET-CASES';
const CHANGE_CASES = 'CHANGE_CASES';

let stateInitial = {
    isLoading: false,
    date: '', // дата заппроса
    // [confirmedNew, confirmedTotal, recoveredNew, recoveredTotal, deathsNew, deathsTotal]
    global: [], // массив значений по всему миру
    cases: [], // массив значений выбранной страны
    // [{Country: "Country", cases: [confirmedNew, confirmedTotal, recoveredNew, recoveredTotal, deathsNew, deathsTotal]}, ...]
    countries: [],// массив значений по странам
    countriesList: [], //список стран
    currentCountry: '' // выбранная страна


};

const summaryReducer = (state = stateInitial, action) => {
    switch (action.type) {

        case TOGGLE_LOADING: {
            return {...state, isLoading: action.isLoading}
        }

        case SET_DATE: {
            return {...state, date: action.date}
        }

        case SET_GLOBAL: {
            let global = [];
            global.push(action.global.NewConfirmed);
            global.push(action.global.TotalConfirmed);
            global.push(action.global.NewRecovered);
            global.push(action.global.TotalRecovered);
            global.push(action.global.NewDeaths);
            global.push(action.global.TotalDeaths);
            return {...state, global: global}
        }

        case INITIAL_SET_CASES: {
            let cases = [];
            cases.push(action.country.NewConfirmed);
            cases.push(action.country.TotalConfirmed);
            cases.push(action.country.NewRecovered);
            cases.push(action.country.TotalRecovered);
            cases.push(action.country.NewDeaths);
            cases.push(action.country.TotalDeaths);
            return {...state, cases: cases}
        }

        case CHANGE_CASES: {
            let cases = state.countries.find(el => el.country === action.country).cases;
            return {...state, cases: cases};
        }

        case SET_COUNTRIES: {
            let countries = [];
            for (let i = 0; i < action.countries.length; i++) {
                countries[i] = {};
                countries[i].country = action.countries[i].Country;
                countries[i].cases = [];
                countries[i].cases.push(action.countries[i].NewConfirmed);
                countries[i].cases.push(action.countries[i].TotalConfirmed);
                countries[i].cases.push(action.countries[i].NewRecovered);
                countries[i].cases.push(action.countries[i].TotalRecovered);
                countries[i].cases.push(action.countries[i].NewDeaths);
                countries[i].cases.push(action.countries[i].TotalDeaths);
            }
            return {...state, countries: countries}
        }

        case SET_CURRENT_COUNTRY: {
            return {...state, currentCountry: action.country};
        }

        case SET_COUNTRIES_LIST: {
            let countriesList = [];
            for (let i = 0; i < action.countries.length; i++) {
                countriesList.push(action.countries[i].Country);
            }
            return {...state, countriesList: countriesList};
        }

        default:
            return state;
    }
};

export const toggleLoading = (isLoading) => ({type: TOGGLE_LOADING, isLoading});
export const setDate = (date) => ({type: SET_DATE, date});
export const setGlobal = (global) => ({type: SET_GLOBAL, global});
export const setCountries = (countries) => ({type: SET_COUNTRIES, countries});
export const setCurrentCountry = (country) => ({type: SET_CURRENT_COUNTRY, country});
export const setCountriesList = (countries) => ({type: SET_COUNTRIES_LIST, countries});
export const initialSetCases = (country) => ({type: INITIAL_SET_CASES, country});
export const changeCases = (country) => ({type: CHANGE_CASES, country});

export const getInitial = () => dispatch => {
    dispatch(toggleLoading(true));
    summaryAPI.getInitial()
        .then(data => {
            dispatch(setDate(data.Date));
            dispatch(setGlobal(data.Global));
            dispatch(initialSetCases(data.Countries[138]))
            dispatch(setCountries(data.Countries));
            dispatch(setCountriesList(data.Countries));
            dispatch(setCurrentCountry(data.Countries[138].Country));
            dispatch(toggleLoading(false));
        })
}

export default summaryReducer;