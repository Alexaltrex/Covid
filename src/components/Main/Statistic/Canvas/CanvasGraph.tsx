import React, {ReactElement, useEffect, useRef} from "react";
import {CANVAS} from "../../../../helpers/canvas";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CanvasGraphPropsType} from "./CanvasGraphContainer";
import throttle from 'lodash/throttle';

export const CanvasGraph: React.FC<CanvasGraphPropsType> = (props: CanvasGraphPropsType): ReactElement => {
    const {
        setMouseXY, setMouseHoverCanvas,
        valuesCurrent, period, caseType
    } = props;
    const classes = useStyles();

    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const marginLeftX = CANVAS.marginLeftX;
        const paddingLeftX = CANVAS.paddingLeftX;
        const marginRightX = CANVAS.marginRightX;
        const marginY = CANVAS.marginY;
        const canvasW = CANVAS.canvasW();
        const canvasH = CANVAS.canvasH();

        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current;
            ctx!.clearRect(0, 0, canvasW, canvasH);// очистка перед перерисовкой
            ctx!.fillStyle = 'transparent';
            ctx!.fillRect(0, 0, canvasW, canvasH);

            const valuesCurrentFilter = valuesCurrent.filter(el => el) as Array<number>
            const valueMin = Math.min.apply(null, valuesCurrentFilter);// минимальное значение из массива
            const valueMax = Math.max.apply(null, valuesCurrentFilter);// максимальное значение из массива
            const DELTA = valueMax - valueMin; // разница между макс и мин
            const deltaX = (canvasW - marginLeftX - marginRightX - paddingLeftX) / (period - 1);// коэффициэнт перевода в масштаб канваса по оси X
            let canvasX = (i: number): number => {// функция пересчета значения X i-го элемента массива в масштаб канваса
                return marginLeftX + paddingLeftX + i * deltaX;
            };

            let deltaGridY: number, valueMinGrid: number, valueMaxGrid: number, deltaY: number;
            if (DELTA !== 0) {
                deltaGridY = CANVAS.deltaGridYf(DELTA); // шаг координатной сетки по оси Y
                valueMinGrid = deltaGridY * Math.floor(valueMin / deltaGridY);// значение по сетке, ограничивающее график снизу
                valueMaxGrid = deltaGridY * (Math.ceil(valueMax / deltaGridY) + 0 * 1);// значение по сетке, ограничивающее график сверху
                deltaY = (canvasH - marginY) / (valueMaxGrid - valueMinGrid);// коэффициэнт перевода в масштаб канваса по оси Y

                let canvasY = (value: number): number => {// функция пересчета значения Y i-го элемента массива в масштаб канваса
                    return canvasH - marginY - deltaY * (value - valueMinGrid);
                };

                //горизонтальные линии
                ctx!.strokeStyle = '#cccccc';
                ctx!.lineWidth = 1;
                ctx!.setLineDash([]);
                let yLineStart = valueMinGrid;
                while (true) {
                    ctx!.beginPath();
                    ctx!.moveTo(marginLeftX, canvasY(yLineStart));
                    ctx!.lineTo(canvasW, canvasY(yLineStart));
                    ctx!.stroke();
                    yLineStart += deltaGridY;
                    if (yLineStart > valueMaxGrid) {
                        break
                    }
                }

            } else {
                deltaGridY = 1;
                valueMinGrid = valueMin;
                valueMaxGrid = valueMax;
            }

            let canvasY = (value: number): number => {
                if (DELTA !== 0) {
                    return canvasH - marginY - deltaY * (value - valueMinGrid);
                } else {
                    return (canvasH) / 2 - marginY;
                }
            }

            // график 'confirmed', 'recovered', 'deaths'
            if (caseType === 'confirmed') ctx!.strokeStyle = 'red';
            if (caseType === 'recovered') ctx!.strokeStyle = 'green';
            if (caseType === 'deaths') ctx!.strokeStyle = 'blue';
            ctx!.lineWidth = 3;
            ctx!.setLineDash([]);
            for (let i = 0; i < period; i++) {
                if (i === 0) {
                    ctx!.beginPath();
                    if (valuesCurrent[0] !== null) {
                        ctx!.moveTo(canvasX(i), canvasY(valuesCurrent[0]));
                    } else {
                        ctx!.moveTo(canvasX(i), canvasY(valueMinGrid))
                    }

                }
                if (i > 0) {
                    const valuePrev = valuesCurrent[i-1];
                    const valueNow = valuesCurrent[i];

                    if (valuePrev !== null && valueNow !== null) {
                        ctx!.lineTo(canvasX(i), canvasY(valueNow));
                    }
                    if (valuePrev !== null && valueNow === null) {
                        ctx!.lineTo(canvasX(i - 1), canvasY(valueMinGrid));
                        ctx!.moveTo(canvasX(i), canvasY(valueMinGrid));
                    }
                    if (valuePrev == null && valueNow !== null) {
                        ctx!.moveTo(canvasX(i), canvasY(valueMinGrid));
                        ctx!.lineTo(canvasX(i), canvasY(valueNow));
                    }
                    if (valuePrev == null && valuesCurrent[i] == null) {
                        ctx!.moveTo(canvasX(i), canvasY(valueMinGrid));
                    }
                }
                if (i === period - 1) {
                    ctx!.stroke();
                }
            }


        }
    }, [valuesCurrent, period, caseType]);

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (e.target) {
            const canvas: DOMRect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - canvas.left;
            const y = e.clientY - canvas.top;
            //console.log('on CanvasGraph move')
            setMouseXY(x, y);
        }
    };

    const onMouseMoveThrottle = throttle(onMouseMove, 10);

    const onMouseEnter = () => {
        setMouseHoverCanvas(true)
    };

    const onMouseLeave = () => {
        setMouseHoverCanvas(false)
    };

    return (
        <canvas
            className={classes.canvasGraph}
            ref={canvasRef}
            width={CANVAS.canvasW()}
            height={CANVAS.canvasH()}
            onMouseMove={onMouseMoveThrottle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}

        />

    )
};
export default CanvasGraph;

//======================= STYLE ===================
const useStyles = makeStyles({
    canvasGraph: {
        zIndex: 4,
        position: 'absolute',
        top: 0,
        left: 0,
    },
});