import * as axios from "axios";
import {DATE} from "./date";


const instance = axios.create({
    baseURL: 'https://api.covid19api.com/'
});

export const summaryAPI = {
    getInitial(){
        return instance.get('summary')
            .then(response => response.data)
    }
}


// total/country/russia?from=2020-07-05T00:00:00Z&to=2020-07-06T00:00:00Z
export const statisticAPI = {
    getCountries(){
        return instance.get('countries')
            .then(response => response.data)
    },
    getValues(country, dateStart, dateEnd) {
        return instance.get(`total/country/${country}?from=${dateStart}&to=${dateEnd}`)
            .then(response => response.data)
    },
    // получение актуальной последней даты (может не совпадать с текущей или вчерашней)
    getDateEnd(country){
        let dateStart = DATE.getStartPeriodDate(2);
        let dateEnd = DATE.dateJsToAPI(DATE.getCurrentDate());
        return instance.get(`total/country/${country}?from=${dateStart}&to=${dateEnd}`)
            .then(response => response.data)
    }

}