import {StateType} from "../store";

export const getCountriesData = (state: StateType) => state.statistic.countriesData;
export const getPeriod = (state: StateType) => state.statistic.period;
export const getDateEnd = (state: StateType) => state.statistic.dateEnd;
export const getDates = (state: StateType) => state.statistic.dates;
export const getAllValues = (state: StateType) => state.statistic.allValues;
export const getMouseX = (state: StateType) => state.statistic.mouseX;
export const getMouseY = (state: StateType) => state.statistic.mouseY;
export const getMouseHoverCanvas = (state: StateType) => state.statistic.mouseHoverCanvas;
export const getValuesCurrent = (state: StateType) => state.statistic.valuesCurrent;
export const getShowInfo = (state: StateType) => state.statistic.showInfo;
export const getInfoValue = (state: StateType) => state.statistic.infoValue;
export const getInfoDate = (state: StateType) => state.statistic.infoDate;
export const getXPoint = (state: StateType) => state.statistic.xPoint;
export const getYPoint = (state: StateType) => state.statistic.yPoint;
export const getIsInitialized = (state: StateType) => state.statistic.isInitialized;
export const getFormValuesSelector = (state: StateType) => state.statistic.formValues;
