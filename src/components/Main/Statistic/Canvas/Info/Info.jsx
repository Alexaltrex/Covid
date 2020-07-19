import React from 'react';
import style from './Info.module.css';
import {CANVAS} from "../../../../../DAL/canvas";

const Info = (props) => {

    let left;
    const deltaX = (CANVAS.canvasW() - CANVAS.marginLeftX - CANVAS.marginRightX - CANVAS.paddingLeftX) / (props.period - 1);
    let canvasX = (i) => {
        return CANVAS.marginLeftX + CANVAS.paddingLeftX + i * deltaX;
    }
    let iMouseGrid = Math.round((props.mouseX - CANVAS.paddingLeftX - CANVAS.marginLeftX) / deltaX);
    let xMouseGrid = canvasX(iMouseGrid);
    if (props.mouseX > CANVAS.marginLeftX + CANVAS.paddingLeftX
        && props.mouseX < CANVAS.canvasW() - CANVAS.marginRightX) {
        left = xMouseGrid;
    }

    let styleInfo = {
        top: props.mouseY - 50,
        left: left + 10
    };
    let colorValue;
    if (props.caseType === 'confirmed') colorValue = 'red';
    if (props.caseType === 'recovered') colorValue = 'green';
    if (props.caseType === 'deaths') colorValue = 'blue';
    let styleValue = {
        color: colorValue
    }

    let onMouseEnter = () => {
        props.setMouseHoverCanvas(true);
    };

    let onMouseLeave = () => {
        props.setMouseHoverCanvas(false);
    }

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={styleInfo} className={style.info}>
            <div style={styleValue} className={style.value}>{props.infoValue}</div>
            <div>{props.infoDate}</div>
        </div>
    )
};

export default Info;