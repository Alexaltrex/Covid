import React from 'react';
import Value from "./Value/Value";

const Values = (props) => {
       let valuesElements = props.valuesArr.map((el, i) => <Value key={i} value={el} top={props.topArr[i]} left={props.left}/>)
       return (
        <>
            {valuesElements}
        </>
    )
};

export default Values;