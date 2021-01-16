import React, {ReactElement, useEffect, useRef} from "react";
import {CANVAS} from "../../../../helpers/canvas";
import makeStyles from "@material-ui/core/styles/makeStyles";

//================== CUSTOM HOOK ==================
const useCanvasAxis = () => {
    const classes = useStyles();
    let canvasAxisRef = useRef<HTMLCanvasElement | null>(null);
    let canvasAxisCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        if (canvasAxisRef.current) {
            const canvasW = CANVAS.canvasW();
            const canvasH = CANVAS.canvasH();
            canvasAxisCtxRef.current = canvasAxisRef.current.getContext('2d');
            let ctx = canvasAxisCtxRef.current;
            ctx!.clearRect(0, 0, canvasW, canvasH);
            ctx!.fillStyle = '#fff';
            ctx!.fillRect(0, 0, canvasW, canvasH);
            ctx!.strokeStyle = '#aaa';
            ctx!.lineWidth = 4;
            ctx!.setLineDash([]);
            ctx!.beginPath();
            ctx!.moveTo(CANVAS.marginLeftX, 0);
            ctx!.lineTo(CANVAS.marginLeftX, CANVAS.canvasH() - CANVAS.marginY);
            ctx!.moveTo(CANVAS.marginLeftX, CANVAS.canvasH() - CANVAS.marginY);
            ctx!.lineTo(CANVAS.canvasW(), CANVAS.canvasH() - CANVAS.marginY);
            ctx!.stroke();
        }
    }, []);

    return {
        classes, canvasAxisRef
    }
};

//================== COMPONENT ====================
export const CanvasAxis: React.FC = (): ReactElement => {
    const {
        classes, canvasAxisRef
    } = useCanvasAxis();

    return (
        <>
            <canvas
                className={classes.canvasAxis}
                ref={canvasAxisRef}
                width={CANVAS.canvasW()}
                height={CANVAS.canvasH()}
            />
        </>

    )
};

const CanvasAxisMemo = React.memo(CanvasAxis)

export default CanvasAxisMemo;

//======================= STYLE ===================
const useStyles = makeStyles({
    canvasAxis: {
        zIndex: 3,
        position: 'absolute',
        top: 0,
        left: 0,
    },
});