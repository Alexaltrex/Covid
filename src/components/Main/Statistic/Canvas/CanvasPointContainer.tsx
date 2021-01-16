import {connect} from "react-redux";
import {StateType} from "../../../../store/store";
import {CaseTypeType} from "../../../../types/types";

import CanvasPoint from "./CanvasPoint";
import {statisticAC} from "../../../../store/statistic-reducer";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    mouseHoverCanvas: state.statistic.mouseHoverCanvas,
    mouseX: state.statistic.mouseX,
    xPoint: state.statistic.xPoint,
    yPoint: state.statistic.yPoint,
    caseType: state.statistic.formValues.caseType,
    showInfo: state.statistic.showInfo,
});

const setMouseXY = statisticAC.setMouseXY;
const setMouseHoverCanvas = statisticAC.setMouseHoverCanvas;
const CanvasPointContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {setMouseXY, setMouseHoverCanvas})(CanvasPoint);

export default CanvasPointContainer;

//======================== TYPE ==========================
type MapStatePropsType = {
    mouseHoverCanvas: boolean
    mouseX: number
    xPoint: number
    yPoint: number | null
    caseType: CaseTypeType
    showInfo: boolean
}
type MapDispatchPropsType = {
    setMouseXY: (mouseX: number, mouseY: number) => void
    setMouseHoverCanvas: (mouseHoverCanvas: boolean) => void
}
export type CanvasPointPropsType = MapStatePropsType & MapDispatchPropsType