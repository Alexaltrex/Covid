import React from 'react';

const Country = (props) => {
    let onChange = (e) => {
        props.setCurrentCountry(e.currentTarget.value);
        props.changeCases(e.currentTarget.value);
    }
    let optionElements = props.countriesList.map((country, i) =>
        (<option key={i} value={country}>
            {country}
        </option>))
    return (
        <select onChange={onChange} value={props.currentCountry}>
            {optionElements}
        </select>
    )
};

export default Country;

