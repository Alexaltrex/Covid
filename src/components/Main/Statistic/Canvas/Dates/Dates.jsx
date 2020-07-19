import React from 'react';
import Date from "./Date/Date";

const Dates = (props) => {
    let k = 1;
    if (+props.period === 30) {
        k = 2
    } else if (+props.period > 30) {
        k = Math.floor(+props.period/16);
    }
    let datesElements = props.dates.map((date, i) => (i % k === 0) ?
        <Date key={i} value={date} top={props.top} left={props.leftArr[i]}/> : null)
    return (
        <>
            {datesElements}
        </>
    )
};

export default Dates;