import React from 'react';
import style from "../Summary.module.css";
import SummaryItem from "./SummaryItem/SummaryItem";

const SummaryItems = (props) => {
    let color = ['darkred', 'darkred', 'darkgreen', 'darkgreen', 'darkblue', 'darkblue'];
    let type = ['Confirmed new', 'Confirmed total', 'Recovered new', 'Recovered total', 'Deaths new', 'Deaths total'];
    let SummaryItemElements = props.cases.map((value, i) => <SummaryItem key={i} value={value} color={color[i]}
                                                                         type={type[i]}/>)
    //console.log(props.cases);
    //Color[index]
    return (
        <div className={style.items}>
            {SummaryItemElements}
        </div>
    )
};

export default SummaryItems;