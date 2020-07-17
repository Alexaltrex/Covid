import React from 'react';
import style from './CountryStatistic.module.css';

const Country = (props) => {
    //console.log(props)
    let onChange = (e) => {
        props.setCurrentCountry(e.currentTarget.value);

    }
    let optionElements = props.countriesData.map((el, i) =>
        (<option key={i} value={el.Country}>
            {el.Country}
        </option>))
    return (
        <select onChange={onChange} value={props.currentCountry} className={style.select}>
            {optionElements}
        </select>
    )
};

export default Country;

