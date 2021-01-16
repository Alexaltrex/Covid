import {StateType} from "../store";

export const getDate = (state: StateType) => state.summary.date;
export const getSummaryCases = (state: StateType) => state.summary.summaryCases;
export const getCountriesCases = (state: StateType) => state.summary.countriesCases;
export const getCountriesList = (state: StateType) => state.summary.countriesList;
export const getCurrentCountry = (state: StateType) => state.summary.currentCountry;