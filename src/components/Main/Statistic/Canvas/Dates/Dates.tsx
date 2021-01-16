import React, {ReactElement} from 'react';
import Date from "./Date";
import {CANVAS} from "../../../../../helpers/canvas";
import {DatesPropsType} from "./DatesContainer";

const Dates: React.FC<DatesPropsType> = (props: DatesPropsType): ReactElement => {
    const {dates, period} = props;

    const canvasW = CANVAS.canvasW();
    const canvasH = CANVAS.canvasH();
    const marginY = CANVAS.marginY
    const marginLeftX = CANVAS.marginLeftX;
    const marginRightX = CANVAS.marginRightX;
    const paddingLeftX = CANVAS.paddingLeftX

    const deltaX = (canvasW - marginLeftX - marginRightX - paddingLeftX) / (period - 1);
    let canvasX = (i: number): number => {
        return marginLeftX + paddingLeftX + i * deltaX;
    };
    let top = canvasH - marginY;
    let leftArr = [] as Array<number>;
    for (let i = 0; i < props.dates.length; i++){
        leftArr.push(canvasX(i));
    }

    let k = 1;
    if (+period === 30) {
        k = 2
    } else if (+period > 30) {
        k = Math.floor(+period/16);
    }
    let datesElements = dates.map((date, i) => (
        (i % k === 0)
            ? <Date key={i}
                    date={date}
                    top={top}
                    left={leftArr[i]}
            />
            : null)
    );

    return (
        <>
            {datesElements}
        </>
    )
};

export default Dates;
