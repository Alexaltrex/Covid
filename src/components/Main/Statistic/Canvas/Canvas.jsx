import React from 'react';
import style from './Canvas.module.css';
import {CANVAS} from "../../../../DAL/canvas";
import InfoContainer from "./Info/InfoContainer";
import Preloader from "../../../common/Preloader/Preloader";
import DatesContainer from "./Dates/DatesContainer";
import ValuesContainer from "./Values/ValuesContainer";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.marginLeftX = CANVAS.marginLeftX;
        this.paddingLeftX = CANVAS.paddingLeftX;
        this.marginRightX = CANVAS.marginRightX;
        this.marginY = CANVAS.marginY; // вниз
        this.canvasW = CANVAS.canvasW();
        this.canvasH = CANVAS.canvasH();
    }

    componentDidMount() {
        this.drawCanvasAxis();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let valueIsExists = !!this.props.valuesCurrent && !!this.props.valuesCurrent.length;
        if (valueIsExists && prevProps.valuesCurrent !== this.props.valuesCurrent) {
            this.drawCanvasGraph();
        }
        if (valueIsExists && this.props.mouseHoverCanvas && this.props.showInfo &&
            (prevProps.mouseX !== this.props.mouseX || prevProps.mouseY !== this.props.mouseY)) {
            this.drawCanvasPoint();
        }
    }

    /////////////////////////////////////////////////////////
    // оси координат - рисуются только при вставке компонента
    /////////////////////////////////////////////////////////
    drawCanvasAxis = () => {
        let ctx = this.refs.canvasAxis.getContext('2d');
        ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, this.canvasW, this.canvasH);
        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 4;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(CANVAS.marginLeftX, 0);
        ctx.lineTo(CANVAS.marginLeftX, CANVAS.canvasH() - CANVAS.marginY);
        ctx.moveTo(CANVAS.marginLeftX, CANVAS.canvasH() - CANVAS.marginY);
        ctx.lineTo(CANVAS.canvasW(), CANVAS.canvasH() - CANVAS.marginY);
        ctx.stroke();
    }

    ////////////////////////////////////////////////////////////////////
    // график и горизонтальные линии
    ////////////////////////////////////////////////////////////////////
    drawCanvasGraph = () => {
        // let period;
        // if (this.props.period !== -1) {
        //     period = this.props.period;
        // } else {
        //     period = this.props.periodByFirstDay;
        // }
        let values = this.props.valuesCurrent;
        const valueMin = Math.min.apply(null, values.filter(el => el !== null));
        const valueMax = Math.max.apply(null, values.filter(el => el !== null));
        const DELTA = valueMax - valueMin;
        const deltaX = (this.canvasW - this.marginLeftX - this.marginRightX - this.paddingLeftX) / (this.props.period - 1);
        let canvasX = (i) => {
            return this.marginLeftX + this.paddingLeftX + i * deltaX;
        };

        let deltaGridY, valueMinGrid, valueMaxGrid, deltaY;
        if (DELTA !== 0) {
            deltaGridY = CANVAS.deltaGridYf(DELTA); // шаг координатной сетки по оси Y
            valueMinGrid = deltaGridY * Math.floor(valueMin / deltaGridY);
            valueMaxGrid = deltaGridY * (Math.ceil(valueMax / deltaGridY) + 0 * 1);
            deltaY = (this.canvasH - this.marginY) / (valueMaxGrid - valueMinGrid);
        }
        let canvasY = (value) => {
            if (DELTA !== 0) {
                return this.canvasH - this.marginY - deltaY * (value - valueMinGrid);
            } else {
                return (this.canvasH) / 2 - this.marginY;
            }
        }

        let ctx = this.refs.canvasGraph.getContext('2d');
        ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, this.canvasW, this.canvasH);

        //горизонтальные линии
        if (DELTA !== 0) {
            ctx.strokeStyle = '#cccccc';
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
            let yLineStart = valueMinGrid;
            while (true) {
                ctx.beginPath();
                ctx.moveTo(this.marginLeftX, canvasY(yLineStart));
                ctx.lineTo(this.canvasW, canvasY(yLineStart));
                ctx.stroke();
                yLineStart += deltaGridY;
                if (yLineStart > valueMaxGrid) {
                    break
                }
            }
        }

        // график 'confirmed', 'recovered', 'deaths'
        if (this.props.caseType === 'confirmed') ctx.strokeStyle = 'red';
        if (this.props.caseType === 'recovered') ctx.strokeStyle = 'green';
        if (this.props.caseType === 'deaths') ctx.strokeStyle = 'blue';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        for (let i = 0; i < this.props.period; i++) {
            if (i === 0) {
                ctx.beginPath();
                ctx.moveTo(canvasX(i), canvasY(values[i]));
            }
            if (i > 0) {
                if (values[i - 1] !== null && values[i] !== null) {
                    ctx.lineTo(canvasX(i), canvasY(values[i]));
                }
                if (values[i - 1] !== null && values[i] === null) {
                    ctx.lineTo(canvasX(i - 1), canvasY(valueMinGrid));
                    ctx.moveTo(canvasX(i), canvasY(valueMinGrid));
                }
                if (values[i - 1] == null && values[i] !== null) {
                    ctx.moveTo(canvasX(i), canvasY(valueMinGrid));
                    ctx.lineTo(canvasX(i), canvasY(values[i]));
                }
                if (values[i - 1] == null && values[i] == null) {
                    ctx.moveTo(canvasX(i), canvasY(valueMinGrid));
                }
            }
            if (i === this.props.period - 1) {
                ctx.stroke();
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    // точка и верткальная линия - рисуетя только при наведении мыши на канвас
    ///////////////////////////////////////////////////////////////////////////
    drawCanvasPoint = () => {

        let ctx = this.refs.canvasPoint.getContext('2d');
        ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, this.canvasW, this.canvasH);

        if (this.props.mouseHoverCanvas) {
            // вертикальная линия
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 1]);
            ctx.beginPath();
            //let iMouseGrid = Math.round((this.props.mouseX - this.paddingLeftX - this.marginLeftX) / deltaX);
            //let xMouseGrid = canvasX(iMouseGrid);
            if (this.props.mouseX > this.marginLeftX + this.paddingLeftX
                && this.props.mouseX < this.canvasW - this.marginRightX) {
                ctx.moveTo(this.props.xPoint, 0);
                ctx.lineTo(this.props.xPoint, this.canvasH - this.marginY);
                ctx.stroke();
            }

            // точка
            if (this.props.yPoint !== null) {
                let color;
                if (this.props.caseType === 'confirmed') color = 'red';
                if (this.props.caseType === 'recovered') color = 'green';
                if (this.props.caseType === 'deaths') color = 'blue';
                ctx.strokeStyle = color;
                ctx.lineWidth = 4;
                ctx.lineJoin = 'round';
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.arc(this.props.xPoint, this.props.yPoint, 3, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = color;
                ctx.fill();
            }
        }
    };

    onMouseMove = (e) => {
        const canvas = e.target.getBoundingClientRect();
        let x = e.clientX - canvas.left;
        let y = e.clientY - canvas.top;
        this.props.setMouseXY(x, y);
    };

    onMouseEnter = () => {
        this.props.setMouseHoverCanvas(true);
    };

    onMouseLeave = () => {
        this.props.setMouseHoverCanvas(false);
    };

    render() {
        let valueIsExists = !!this.props.valuesCurrent && !!this.props.valuesCurrent.length;
        let canvasWrapperStyle = {
            width: this.canvasW, height: this.canvasH
        };
        return (
            <div className={style.canvas}>
                <div className={style.canvasWrapper} style={canvasWrapperStyle}>
                    {this.props.isLoading && <Preloader/>}
                    {valueIsExists && this.props.showInfo && this.props.mouseHoverCanvas && <InfoContainer/>}
                    {valueIsExists && <ValuesContainer values={this.props.valuesCurrent}/>}
                    {valueIsExists && <DatesContainer values={this.props.valuesCurrent}
                                                      dates={this.props.dates}
                                                      period={this.props.period}/>}
                    <canvas ref="canvasAxis" width={this.canvasW} height={this.canvasH}
                            className={style.canvasAxis}/>

                    {valueIsExists && <canvas ref="canvasGraph"
                                              className={style.canvasGraph}
                                              width={this.canvasW}
                                              height={this.canvasH}
                                              onMouseMove={this.onMouseMove}
                                              onMouseEnter={this.onMouseEnter}
                                              onMouseLeave={this.onMouseLeave}/>}
                    {valueIsExists && this.props.mouseHoverCanvas && this.props.showInfo
                    && <canvas ref="canvasPoint"
                               className={style.canvasPoint}
                               width={this.canvasW}
                               height={this.canvasH}
                               onMouseMove={this.onMouseMove}
                               onMouseEnter={this.onMouseEnter}
                               onMouseLeave={this.onMouseLeave}/>}
                </div>
            </div>
        );
    }
}

export default Canvas