import {StateType} from "../store";

export const getIsLoading = (state: StateType) => state.app.isLoading;
export const getLanError = (state: StateType) => state.app.lanError;
export const getLanErrorResponse = (state: StateType) => state.app.lanErrorResponse;
export const getLang = (state: StateType) => state.app.lang;