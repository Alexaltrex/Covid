import React from 'react';
import Date from "./Date/Date";

const Dates = (props) => {
    let k = 1;
    if (props.period === '30') {
        k = 2
    };
    let datesElements = props.dates.map((date, i) => (i % k === 0) ?
        <Date key={date} value={date} top={props.top} left={props.leftArr[i]}/> : null)
    return (
        <>
            {datesElements}
        </>
    )
};

export default Dates;