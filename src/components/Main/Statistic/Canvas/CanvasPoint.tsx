import React, {ReactElement, useEffect, useRef} from "react";
import {CANVAS} from "../../../../helpers/canvas";
import makeStyles from "@material-ui/core/styles/makeStyles";
import throttle from 'lodash/throttle'
import {useDispatch, useSelector} from "react-redux";
import {
    getFormValuesSelector,
    getMouseHoverCanvas,
    getMouseX, getShowInfo,
    getXPoint,
    getYPoint
} from "../../../../store/selectors/statistic-selectors";
import {statisticAC} from "../../../../store/reducers/statistic-reducer";

//================== CUSTOM HOOK ==================
const useCanvasPoint = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const mouseHoverCanvas = useSelector(getMouseHoverCanvas)
    const mouseX = useSelector(getMouseX);
    const xPoint = useSelector(getXPoint);
    const yPoint = useSelector(getYPoint);
    const caseType = useSelector(getFormValuesSelector).caseType;
    const showInfo = useSelector(getShowInfo);

    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        if (canvasRef.current && mouseHoverCanvas && showInfo) {
            const marginLeftX = CANVAS.marginLeftX;
            const paddingLeftX = CANVAS.paddingLeftX;
            const marginRightX = CANVAS.marginRightX;
            const marginY = CANVAS.marginY;
            const canvasW = CANVAS.canvasW();
            const canvasH = CANVAS.canvasH();
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current;
            ctx!.clearRect(0, 0, canvasW, canvasH);// очистка перед перерисовкой
            ctx!.fillStyle = 'transparent';
            ctx!.fillRect(0, 0, canvasW, canvasH);

            // вертикальная линия
            ctx!.strokeStyle = '#000000';
            ctx!.lineWidth = 1;
            ctx!.setLineDash([2, 1]);
            ctx!.beginPath();

            if (mouseX > marginLeftX + paddingLeftX
                && mouseX < canvasW - marginRightX) {
                ctx!.moveTo(xPoint, 0);
                ctx!.lineTo(xPoint, canvasH - marginY);
                ctx!.stroke();
            }

            // точка
            if (yPoint !== null) {
                let color = '000';
                if (caseType === 'confirmed') color = 'red';
                if (caseType === 'recovered') color = 'green';
                if (caseType === 'deaths') color = 'blue';
                ctx!.strokeStyle = color;
                ctx!.lineWidth = 4;
                ctx!.lineJoin = 'round';
                ctx!.setLineDash([]);
                ctx!.beginPath();
                ctx!.arc(xPoint, yPoint, 3, 0, 2 * Math.PI);
                ctx!.stroke();
                ctx!.fillStyle = color;
                ctx!.fill();
            }

        }
    }, [mouseHoverCanvas, mouseX, xPoint, yPoint, caseType, showInfo]);

    const onMouseEnter = () => {
        dispatch(statisticAC.setMouseHoverCanvas(true));
    };

    const onMouseLeave = () => {
        dispatch(statisticAC.setMouseHoverCanvas(false));
    };

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (e.target) {
            const canvas: DOMRect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - canvas.left;
            const y = e.clientY - canvas.top;
            dispatch(statisticAC.setMouseXY(x, y));
        }
    };

    const onMouseMoveThrottle = throttle(onMouseMove, 10);

    return {
        classes, canvasRef, onMouseEnter,
        onMouseLeave, onMouseMoveThrottle
    }
};

//================== COMPONENT ====================
export const CanvasPoint: React.FC<{}> = (): ReactElement => {
    const {

        classes, canvasRef, onMouseEnter,
        onMouseLeave, onMouseMoveThrottle
    } = useCanvasPoint();

    return (
        <canvas
            className={classes.canvasGraph}
            ref={canvasRef}
            width={CANVAS.canvasW()}
            height={CANVAS.canvasH()}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMoveThrottle}
        />

    )
};
export default CanvasPoint;

//======================= STYLE ===================
const useStyles = makeStyles({
    canvasGraph: {
        zIndex: 5,
        position: 'absolute',
        top: 0,
        left: 0,
    },
});