import React from 'react';
import style from './Main.module.css'
import {Route, Switch} from "react-router-dom";
import Statistic from "./Statistic/Statistic";
import Home from "./Home/Home";
import SummaryContainer from "./Summary/SummaryContainer";
import StatisticContainer from "./Statistic/StatisticContainer";

const Main = () => {
    return (
        <div className={style.main}>
            <Switch>
                <Route exact path='/covid' render={() => <Home/>}/>
                <Route exact path='/' render={() => <Home/>}/>
                <Route path='/summary' render={() => <SummaryContainer/>}/>
                <Route path='/statistic' render={() => <StatisticContainer/>}/>
            </Switch>
        </div>
    )
};

export default Main;