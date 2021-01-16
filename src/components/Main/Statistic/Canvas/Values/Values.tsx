import React, {ReactElement} from 'react';
import Value from "./Value";
import {CANVAS} from "../../../../../helpers/canvas";
import {useSelector} from "react-redux";
import {getValuesCurrent} from "../../../../../store/selectors/statistic-selectors";

const Values: React.FC<{}> = (): ReactElement => {
    const valuesCurrent = useSelector(getValuesCurrent);

    const marginY = CANVAS.marginY;
    const canvasH = CANVAS.canvasH();

    const valuesCurrentFilter = valuesCurrent.filter(el => el || el === 0) as Array<number>
    const valueMin = Math.min.apply(null, valuesCurrentFilter);// минимальное значение из массива
    const valueMax = Math.max.apply(null, valuesCurrentFilter);// максимальное значение из массива
    const DELTA = valueMax - valueMin; // разница между макс и мин

    let deltaGridY: number; // шаг координатной сетки по оси Y
    let valueMinGrid: number; // значение по сетке, ограничивающее график снизу
    let valueMaxGrid: number; // значение по сетке, ограничивающее график сверху
    let deltaY: number; // коэффициэнт перевода в масштаб канваса по оси Y
    let valuesArr = [] as Array<number>; // массив значений на шкале Y
    let topArr = [] as Array<number>; // массив свойства top абсолютного позиционирования

    if (DELTA !== 0) {
        deltaGridY = CANVAS.deltaGridYf(DELTA);
        valueMinGrid = deltaGridY * Math.floor(valueMin / deltaGridY);
        valueMaxGrid = deltaGridY * (Math.ceil(valueMax / deltaGridY) + 0 * 1);
        deltaY = (canvasH - marginY) / (valueMaxGrid - valueMinGrid);
        const canvasY = (value: number): number => {// функция пересчета значения Y i-го элемента массива в масштаб канваса
            return canvasH - marginY - deltaY * (value - valueMinGrid);
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
        topArr = [CANVAS.canvasH() / 2 - CANVAS.marginY]
    }

    let left = CANVAS.marginLeftX - 5; // значение left абсолютного позиционирования
    let valuesElements = valuesArr.map((el, i) => (
        <Value key={i}
               value={el}
               top={topArr[i]}
               left={left}/>
    ));

    return (
        <>
            {valuesCurrent.length && valuesElements}
        </>
    )
};

export default Values;