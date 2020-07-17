import React from 'react';
import style from './Date.module.css'

const Date = (props) => {
    let styleInline = {top: props.top, left: props.left}
    return (
        <div className={style.value} style={styleInline}>
            {props.value}
        </div>
    )
};

export default Date;