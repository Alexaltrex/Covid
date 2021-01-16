import React, {ReactElement} from 'react';
import Date from "./Date";
import {CANVAS} from "../../../../../helpers/canvas";
import {useSelector} from "react-redux";
import {getDates, getPeriod} from "../../../../../store/selectors/statistic-selectors";

//=============== CUSTOM HOOK ====================
const useDates = () => {
    const dates = useSelector(getDates);
    const period = useSelector(getPeriod);
    const canvasW = CANVAS.canvasW();
    const canvasH = CANVAS.canvasH();
    const marginY = CANVAS.marginY
    const marginLeftX = CANVAS.marginLeftX;
    const marginRightX = CANVAS.marginRightX;
    const paddingLeftX = CANVAS.paddingLeftX;
    const deltaX = (canvasW - marginLeftX - marginRightX - paddingLeftX) / (period - 1);
    let canvasX = (i: number): number => {
        return marginLeftX + paddingLeftX + i * deltaX;
    };
    let top = canvasH - marginY;
    let leftArr = [] as Array<number>;
    for (let i = 0; i < dates.length; i++) {
        leftArr.push(canvasX(i));
    }

    let k = 1;
    if (+period === 30) {
        k = 2
    } else if (+period > 30) {
        k = Math.floor(+period / 16);
    }
    let datesElements = dates.map(
        (date, i) => (
            (i % k === 0)
                ? <Date key={i}
                        date={date}
                        top={top}
                        left={leftArr[i]}
                />
                : null)
    );
    return {
        datesElements
    }
};

//================ COMPONENT ====================
const Dates: React.FC<{}> = (): ReactElement => {
    const {
        datesElements
    } = useDates();

    return (
        <>
            {datesElements}
        </>
    )
};

export default Dates;
