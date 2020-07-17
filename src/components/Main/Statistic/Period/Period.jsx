import React from 'react';
import style from './Period.module.css';

const Period = (props) => {
    let onChange = (e) => {
        props.setPeriod(e.currentTarget.value);
    }
    let options = [['1 week', 7], ['2 weeks', 14], ['30 days', 30]];
    let optionElements = options.map((el, i) =>
        (<option key={i} value={el[1]}>
            {el[0]}
        </option>))
    return (
        <select onChange={onChange} value={props.period} className={style.select}>
            {optionElements}
        </select>
    )
};

export default Period;

