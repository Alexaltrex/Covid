export type CountryInfoType = {
    Country: string // название страны
    CountryCode: string
    Slug: string // строка для query-параметр для api запроса
    Date: string
    Premium: any
}

export type CountryCasesType = {
    NewConfirmed: number,
    TotalConfirmed: number
    NewDeaths: number
    TotalDeaths: number
    NewRecovered: number
    TotalRecovered: number
}

export type SummaryCountryType = CountryInfoType & CountryCasesType

export type SummaryResponseType = {
    Message: string
    Global: CountryCasesType
    Countries: Array<SummaryCountryType>
    Date: string
}

export type CountryType = {
    Country: string // название страны
    Slug: string // строка для query-параметр для api запроса
    ISO2: string
}

export type CountryCasesByDayType = {
    Country: string // название страны
    Confirmed: number
    Deaths: number
    Recovered: number
    Date: string // дата
}

export type typeType = 'byDay' | 'total'
export type CaseTypeType = 'confirmed' | 'recovered' | 'deaths'
export type LangType = 'eng' | 'rus'
export type ByDayOrTotalType = 'byDay' | 'total'
export type PeriodType = '-1' | '7' | '14' | '30'
export type StatisticFormValuesType = { // значения из формы
    country: string // слаг страны
    period: PeriodType
    byDayOrTotal: ByDayOrTotalType
    caseType: CaseTypeType
}
export type LanErrorResponseType = {
    message: string
    status: number
}
export type FormValuesType = {
    country: string
    period: PeriodType
    byDayOrTotal: typeType
    caseType: CaseTypeType
}


