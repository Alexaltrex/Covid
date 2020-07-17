import React from 'react';
import {CANVAS} from "../../../../../DAL/canvas";
import Values from "./Values";

const ValuesContainer = (props) => {
    const valueMin = Math.min.apply(null, props.values.filter(el => el !== null));
    const valueMax = Math.max.apply(null, props.values.filter(el => el !== null));
    const DELTA = valueMax - valueMin;
    let deltaGridY, valueMinGrid, valueMaxGrid, deltaY, canvasY, valuesArr = [], topArr = [];
    if (DELTA !== 0) {
        deltaGridY = CANVAS.deltaGridYf(DELTA); // шаг координатной сетки по оси Y
        valueMinGrid = deltaGridY * Math.floor(valueMin / deltaGridY);
        valueMaxGrid = deltaGridY * (Math.ceil(valueMax / deltaGridY) + 0 * 1);
        deltaY = (CANVAS.canvasH() - CANVAS.marginY) / (valueMaxGrid - valueMinGrid);
        canvasY = (value) => {
            return CANVAS.canvasH() - CANVAS.marginY - deltaY * (value - valueMinGrid);
        };
        let y = valueMinGrid;
        while (true) {
            valuesArr.push(y);
            topArr.push(canvasY(y));
            y += deltaGridY;
            if (y > valueMaxGrid - deltaGridY) {
                valuesArr.push(y);
                topArr.push(canvasY(y));
                break
            }
        }
    } else { // если все значения одинаковы
        valuesArr = [valueMax];
        topArr = [CANVAS.canvasH()/2 - CANVAS.marginY]
    }

    let left = CANVAS.marginLeftX - 5;

    return <Values valuesArr={valuesArr}
                   topArr={topArr}
                   left={left}/>
};

export default ValuesContainer;