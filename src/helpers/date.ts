import {LangType} from "../types/types";

export const DATE = {
    // получение текущей даты
    // RETURN - JS DATE
    getCurrentDate(): Date {
        return new Date();
    },

    // перевод из формата js (Date) в формат API "2020-07-09T00:00:00Z"
    dateJsToAPI(date: Date): string {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        let monthString: string;
        if (month < 10) {
            monthString = `0${month}`;
        } else {
            monthString = `${month}`;
        }
        let day = date.getDate();
        let dayString: string;
        if (day < 10) {
            dayString = `0${day}`;
        } else {
            dayString = `${day}`;
        }
        return `${year}-${monthString}-${dayString}T00:00:00Z`;
    },

    // перевод даты из формата API ('2020-07-09T00:00:00Z') в формат js (Date)
    dateAPIToJs(date: string): Date{
       let year = +date.slice(0,4);
       let month = +date.slice(5,7) - 1;
       let day = +date.slice(8,10)
       return new Date(year, month, day);
    },

    // определение даты начала периода (зависит от текущей последней) в формате API
    getStartPeriodDate(period: number) {
        // period = 7, 14, 30
        // return = API
        let endPeriodDateJS = this.getCurrentDate();
        let startPeriodDateJS = new Date(endPeriodDateJS.getTime() - period * 24 * 60 * 60 * 1000);
        return this.dateJsToAPI(startPeriodDateJS);
    },

    // определение актуальной даты начала периода (зависит от актуальной последней) в формате API
    getStartPeriodDateActual(period: number, date: string) {
        // date = dateEnd, API
        // period = 7, 14, 30
        // return = API
        let endPeriodDateJS = this.dateAPIToJs(date);
        let startPeriodDateJS = new Date(endPeriodDateJS.getTime() - period * 24 * 60 * 60 * 1000);
        return this.dateJsToAPI(startPeriodDateJS);
    },

    // получение массива дат для canvas в формате 'DD.MM'
    getDates(period: number, dateEnd: string) {
        // dateEnd = API
        let dates = [];
        let endPeriodDateJS = this.dateAPIToJs(dateEnd);
        let startPeriodDateJS = new Date(endPeriodDateJS.getTime() - (period - 1) * 24 * 60 * 60 * 1000);
        for (let i = 0; i < period; i++){
            let month = startPeriodDateJS.getMonth() + 1;
            let monthString: string;
            if (month < 10) {
                monthString = `0${month}`;
            } else {
                monthString = `${month}`;
            }
            let day = startPeriodDateJS.getDate();
            let dayString: string;
            if (day < 10) {
                dayString = `0${day}`;
            } else {
                dayString = `${day}`;
            }
            dates.push(`${dayString}.${monthString}`);
            startPeriodDateJS = new Date(startPeriodDateJS.getTime() + 1 * 24 * 60 * 60 * 1000);
        }
        return dates;
    },

    // получить из числового обозначения месяца слово
    getMonthWord(month: number, lang: LangType): string {
        const monthArray = [
            {'eng': "January", 'rus': 'Января'},
            {'eng': "February", 'rus': 'Февраля'},
            {'eng': "March", 'rus': 'Марта'},
            {'eng': "April", 'rus': 'Апреля'},
            {'eng': "May", 'rus': 'Мая'},
            {'eng': "June", 'rus': 'Июня'},
            {'eng': "July", 'rus': 'Июля'},
            {'eng': "August", 'rus': 'Августа'},
            {'eng': "September", 'rus': 'Сентября'},
            {'eng': "October", 'rus': 'Октября'},
            {'eng': "November", 'rus': 'Ноября'},
            {'eng': "December", 'rus': 'Декабря'},
        ];
        return lang === 'eng' ? monthArray[month].eng : monthArray[month].rus
    },

    // перевод из '2020-07-09T00:00:00Z' в '7 сентября 2020'
    dateTranslateFromAPI(date: string, lang: LangType): string {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const monthWord = this.getMonthWord(+month, lang);
        const day = date[8] === '0' ? date.slice(9, 10) : date.slice(8, 10);
        return `${day} ${monthWord} ${year}`
    },

    // "2020-07-11T00:00:00Z" ---> '07.11'
    dateTranslateFromApiToGraph(date: string): string {
        const day = date.slice(8, 10);
        const month = date.slice(5, 7);
        return `${day}.${month}`;
    }

}