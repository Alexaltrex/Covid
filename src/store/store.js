import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from "redux";
import summaryReducer from "./summary-reducer";
import statisticReducer from "./statistic-reducer";


let reducers = combineReducers({
    summaryPage: summaryReducer,
    statisticPage: statisticReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;