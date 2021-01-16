import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {Action, applyMiddleware, combineReducers, createStore, Middleware} from "redux";
import summaryReducer from "./summary-reducer";
import statisticReducer from "./statistic-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import appReducer from "./app-reducer";
import { reducer as formReducer } from 'redux-form';

let rootReducer = combineReducers({
    summary: summaryReducer,
    statistic: statisticReducer,
    app: appReducer,
    form: formReducer,
});
const middleware: Array<Middleware> = [thunkMiddleware];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

// @ts-ignore
window.store = store;

export default store;

//======================== TYPE ==========================
export type StateType = ReturnType<typeof rootReducer>
export type GetActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>