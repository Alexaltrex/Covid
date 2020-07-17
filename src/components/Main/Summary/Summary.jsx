import React from 'react';
import style from './Summary.module.css'
import Preloader from "../../common/Preloader/Preloader";
import SummaryItems from "./SummaryItems/SummaryItems";
import CountryContainer from "./Country/CountryContainer";

const Summary = (props) => {
    if (props.isLoading) return <Preloader/>
    return (
        <div className={style.summary}>
            <div className={style.blocks}>
                <div className={style.block}>
                    <div className={style.title}>
                        Global
                    </div>
                    <SummaryItems cases={props.global}/>
                </div>
                <div className={style.block}>
                    <div className={style.title}>
                        By country
                    </div>
                    <div>
                        <CountryContainer/>
                    </div>
                    <SummaryItems cases={props.cases}/>
                </div>
            </div>

            <div className={style.date}>{props.date}</div>
        </div>
    )
};

export default Summary;