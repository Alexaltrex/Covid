import {LangType} from "../types/types";
import {GetActionsType} from "./store";

export type InitialStateType = typeof initialState;
export type AppActionsType = GetActionsType<typeof appAC>;


let initialState = {
    globalError: null,
    isLoading: false, // загрузка происходит?
    lanError: false, // ошибка сети
    lang: 'eng' as LangType // язык приложения
};

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_LANG':
            console.log('APP/SET_LANG')
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
    toggleLoading: (isLoading: boolean) => ({type: 'APP/TOGGLE_LOADING', isLoading} as const),
    setLanError: (lanError: boolean) => ({type: 'APP/SET_LAN_ERROR', lanError} as const),
    setLang: (lang: LangType) => ({type: 'APP/SET_LANG', lang} as const),
};

export default appReducer;