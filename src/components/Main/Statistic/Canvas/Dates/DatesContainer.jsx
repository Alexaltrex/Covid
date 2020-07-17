import React from 'react';
import {CANVAS} from "../../../../../DAL/canvas";
import Dates from "./Dates";

const DatesContainer = (props) => {
        const deltaX = (CANVAS.canvasW() - CANVAS.marginLeftX - CANVAS.marginRightX - CANVAS.paddingLeftX) / (props.period - 1);
        let canvasX = (i) => {
            return CANVAS.marginLeftX + CANVAS.paddingLeftX + i * deltaX;
        };
        let top = CANVAS.canvasH() - CANVAS.marginY;
        let leftArr = [];
        for (let i = 0; i < props.dates.length; i++){
            leftArr.push(canvasX(i));
        }

    return (
       <Dates dates={props.dates}
              period={props.period}
              top={top}
              leftArr={leftArr}/>
    )
};

export default DatesContainer;