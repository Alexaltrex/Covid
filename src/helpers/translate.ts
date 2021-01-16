import {LangType} from "../types/types";

export const Translate: LangObjectType = {
    'English': {
        'eng': 'English',
        'rus': 'Русский'
    },
    'Change language': {
        'eng': 'Change language',
        'rus': 'Сменить язык'
    },
    'Global': {
        'eng': 'Global',
        'rus': 'Весь мир'
    },
    'By country': {
        'eng': 'By country',
        'rus': 'Для страны'
    },
    'Confirmed new': {
        'eng': 'Confirmed new',
        'rus': 'Заболевших (за день)'
    },
    'Confirmed total': {
        'eng': 'Confirmed total',
        'rus': 'Заболевших (всего)'
    },
    'Deaths new': {
        'eng': 'Deaths new',
        'rus': 'Умерших (за день)'
    },
    'Deaths total': {
        'eng': 'Deaths total',
        'rus': 'Умерших (всего)'
    },
    'Recovered new': {
        'eng': 'Recovered new',
        'rus': 'Вылечившихся (за день)'
    },
    'Recovered total': {
        'eng': 'Recovered total',
        'rus': 'Вылечившихся (всего)'
    },
    'Home': {
        'eng': 'Home',
        'rus': 'Домой'
    },
    'Summary': {
        'eng': 'Summary',
        'rus': 'Суммарно'
    },
    'Statistic': {
        'eng': 'Statistic',
        'rus': 'Статистика'
    },
    '1 week': {
        'eng': '1 week',
        'rus': '1 неделя'
    },
    '2 week': {
        'eng': '2 week',
        'rus': '2 недели'
    },
    '30 days': {
        'eng': '30 days',
        'rus': '30 дней '
    },
    'By start': {
        'eng': 'By start',
        'rus': 'С начала'
    },
    'By day': {
        'eng': 'By day',
        'rus': 'За день'
    },
    'Total': {
        'eng': 'Total',
        'rus': 'Всего'
    },
    'Confirmed': {
        'eng': 'Confirmed',
        'rus': 'Заболевшие'
    },
    'Recovered': {
        'eng': 'Recovered',
        'rus': 'Вылечившиеся'
    },
    'Deaths': {
        'eng': 'Deaths',
        'rus': 'Умершие'
    },
    'Country': {
        'eng': 'Country',
        'rus': 'Страна'
    },
    'Period': {
        'eng': 'Period',
        'rus': 'Период'
    },
    'By day / Total': {
        'eng': 'By day / Total',
        'rus': 'За день / всего'
    },
    'Case type': {
        'eng': 'Case type',
        'rus': 'Тип'
    },
    'Coronavirus statistic': {
        'eng': 'Coronavirus statistic',
        'rus': 'Статистика коронавируса'
    },
    'Automatically retry server request in': {
        'eng': 'Automatically retry server request in',
        'rus': 'Автоматический повтор запроса на сервер через'
    },
    'sec': {
        'eng': 'sec',
        'rus': 'сек'
    }
};

// const lang = useSelector(getLang);
// {translate(lang, '')}

export const translate = (lang: LangType, phrase: string): string => {
    return lang === 'rus' ? Translate[phrase].rus : Translate[phrase].eng
};

type LangObjectType = {
    [key: string]: {
        'eng': string
        'rus': string
    }
}

