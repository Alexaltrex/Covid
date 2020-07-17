import React from 'react';
import style from './Value.module.css'

const Value = (props) => {
    let styleInline = {top: props.top, left: props.left}
    return (
        <div className={style.value} style={styleInline}>
            {props.value}
        </div>
    )
};

export default Value;