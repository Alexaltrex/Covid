import {LangType} from "../../types/types";
import {GetActionsType} from "../store";
import {LanErrorResponseType} from "../../types/types";


export type InitialStateType = typeof initialState;
export type AppActionsType = GetActionsType<typeof appAC>;


let initialState = {
    globalError: null,
    isLoading: false, // загрузка происходит?
    lanError: false, // есть или нет ошибка сети
    lanErrorResponse: null as null | LanErrorResponseType, // информация об ошибке
    lang: 'eng' as LangType // язык приложения
};

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_LAN_ERROR_RESPONSE': {
            return {...state, lanErrorResponse: action.lanErrorResponse}
        }
        case 'APP/SET_LANG':
            return {...state, lang: action.lang}

        case 'APP/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'APP/SET_LAN_ERROR': {
            return {...state, lanError: action.lanError}
        }
        default:
            return state;
    }
};

export const appAC = {
    setLanError: (lanError: boolean) => ({type: 'APP/SET_LAN_ERROR', lanError} as const),
    toggleLoading: (isLoading: boolean) => ({type: 'APP/TOGGLE_LOADING', isLoading} as const),
    setLanErrorResponse: (lanErrorResponse: null | LanErrorResponseType) => ({type: 'APP/SET_LAN_ERROR_RESPONSE', lanErrorResponse} as const),
    setLang: (lang: LangType) => ({type: 'APP/SET_LANG', lang} as const),
};

export default appReducer;