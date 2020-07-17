import React from 'react';
import style from './Type.module.css';

const Type = (props) => {
    let onChange = (e) => {
        props.setType(e.currentTarget.value);
        props.setCurrentValues(e.currentTarget.value, props.caseType)
    }

    return (
        <select onChange={onChange} value={props.type} className={style.select}>
            <option value={'byDay'}>by day</option>
            <option value={'total'}>total</option>
        </select>
    )
};

export default Type;

