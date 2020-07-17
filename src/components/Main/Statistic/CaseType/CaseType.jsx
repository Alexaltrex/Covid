import React from 'react';
import style from './CaseType.module.css';
import {setCurrentValues} from "../../../../store/statistic-reducer";

const CaseType = (props) => {

    let onChange = (e) => {
        props.setCaseType(e.currentTarget.value);
        props.setCurrentValues(props.type, e.currentTarget.value);
    }

    return (
        <select onChange={onChange} value={props.caseType} className={style.select}>
            <option value={'confirmed'}>confirmed</option>
            <option value={'recovered'}>recovered</option>
            <option value={'deaths'}>deaths</option>
        </select>
    )
};

export default CaseType;

