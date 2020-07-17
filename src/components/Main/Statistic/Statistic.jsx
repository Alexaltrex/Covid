import React from 'react';
import style from './Statistic.module.css';
import CountryContainer from "./Country/CountryContainer";
import PeriodContainer from "./Period/PeriodContainer";
import TypeContainer from "./Type/TypeContainer";
import CanvasContainer from "./Canvas/CanvasContainer";
import CaseTypeContainer from "./CaseType/CaseTypeContainer";


const Statistic = (props) => {

    return (
        <div className={style.statistic}>
            <div className={style.canvas}>
                <CanvasContainer/>
                <div>{`mouseHoverCanvas = ${props.mouseHoverCanvas}`}</div>
                <div>{`showInfo = ${props.showInfo}`}</div>
            </div>
            <div className={style.selects}>
                <div className={style.selectBlock}>
                    <div className={style.selectTitle}>Select period:</div>
                    <div><PeriodContainer/></div>
                </div>
                <div className={style.selectBlock}>
                    <div className={style.selectTitle}>by day / total:</div>
                    <div><TypeContainer/></div>
                </div>
                <div className={style.selectBlock}>
                    <div className={style.selectTitle}>case type:</div>
                    <div><CaseTypeContainer/></div>
                </div>
            </div>
            <div className={style.selects}>
                <div className={style.selectBlock}>
                    <div className={style.selectTitle}>Select country:</div>
                    <div><CountryContainer/></div>
                </div>
            </div>



        </div>
    )
};

export default Statistic;