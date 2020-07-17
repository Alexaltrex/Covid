import React from 'react';
import style from './SummaryItem.module.css';

const SummaryItem = (props) => {
    let itemStyle = {color: props.color};
    return (
        <div className={style.item}>
            <div className={style.type} style={itemStyle}>{props.type}</div>
            <div className={style.value}>{props.value}</div>
        </div>
    )
};

export default SummaryItem;