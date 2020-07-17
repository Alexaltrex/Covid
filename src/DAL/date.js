export const DATE = {
    // получение текущей даты
    // RETURN - JS DATE
    getCurrentDate() {
        return new Date();
    },

    // перевод из формата js в формат API
    dateJsToAPI(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return `${year}-${month}-${day}T00:00:00Z`;
    },

    // перевод даты из формата API в формат js
    //"2020-07-09T00:00:00Z"
    dateAPIToJs(date){
       let year = date.slice(0,4);
       let month = date.slice(5,7) - 1;
       let day = date.slice(8,10)
       return new Date(year, month, day);
    },

    // определение даты начала периода (зависит от текущей последней) в формате API
    getStartPeriodDate(period) {
        // period = 7, 14, 30
        // return = API
        let endPeriodDateJS = this.getCurrentDate();
        let startPeriodDateJS = new Date(endPeriodDateJS.getTime() - period * 24 * 60 * 60 * 1000);
        return this.dateJsToAPI(startPeriodDateJS);
    },

    // определение актуальной даты начала периода (зависит от актуальной последней) в формате API
    getStartPeriodDateActual(period, date) {
        // date = dateEnd, API
        // period = 7, 14, 30
        // return = API
        let endPeriodDateJS = this.dateAPIToJs(date);
        let startPeriodDateJS = new Date(endPeriodDateJS.getTime() - period * 24 * 60 * 60 * 1000);
        return this.dateJsToAPI(startPeriodDateJS);
    },

    // получение массива дат для canvas в формате 'DD.MM'
    getDates(period, dateEnd) {
        // dateEnd = API
        let dates = [];
        let endPeriodDateJS = this.dateAPIToJs(dateEnd);
        let startPeriodDateJS = new Date(endPeriodDateJS.getTime() - (period - 1) * 24 * 60 * 60 * 1000);
        //console.log(`dateEndAPI - ${dateEnd}`)
        //console.log(`dateEndJS - ${endPeriodDateJS}`)
        //console.log(startPeriodDateJS)
        for (let i = 0; i < period; i++){
            let month = startPeriodDateJS.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            let day = startPeriodDateJS.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            dates.push(`${day}.${month}`);
            startPeriodDateJS = new Date(startPeriodDateJS.getTime() + 1 * 24 * 60 * 60 * 1000);
        }
        return dates;
    }

}