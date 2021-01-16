import axios from "axios";
import {DATE} from "../helpers/date";
import {CountryCasesByDayType, CountryType, SummaryResponseType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://api.covid19api.com/'
});

export const summaryAPI = {
    async getSummary(){
        const response = await instance.get<SummaryResponseType>('summary')
        return response.data
    }
};

export const statisticAPI = {
    // получить список названий стран
    async getCountries(){
        const response = await instance.get<Array<CountryType>>('countries')
        return response.data
    },
    // получить значения для всех случаев, для конкретной страны, по дням, за период
    async getValuesByPeriod(countrySlug: string, dateStart: string, dateEnd: string) {
        const response = await instance.get<Array<CountryCasesByDayType>>(`total/country/${countrySlug}?from=${dateStart}&to=${dateEnd}`)
        return response.data
    },
    // получение актуальной последней даты для конкретной страны (может не совпадать с текущей или вчерашней)
    // запрашиваем значения начиная с позавчера до сегодня (для конкретной страны)
    // и смотрим дату последнего значения
    async getDateEnd(country: string){
        let dateStart = DATE.getStartPeriodDate(2);
        let dateEnd = DATE.dateJsToAPI(DATE.getCurrentDate());
        const response = await instance.get<Array<CountryCasesByDayType>>(`total/country/${country}?from=${dateStart}&to=${dateEnd}`)
        const dateEndAPI = response.data[response.data.length - 1].Date;//API
        return dateEndAPI
    },
    // получить все типы для заданной страны с первого дня
    async getValuesFromDayOne(country: string){
        const response = await instance.get<Array<CountryCasesByDayType>>(`dayone/country/${country}`)
        return response.data
    }
};