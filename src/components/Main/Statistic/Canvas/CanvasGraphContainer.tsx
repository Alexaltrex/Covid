import {connect} from "react-redux";
import {statisticAC} from "../../../../store/statistic-reducer";
import {StateType} from "../../../../store/store";
import {CaseTypeType} from "../../../../types/types";
import CanvasGraph from "./CanvasGraph";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    period: state.statistic.period,
    valuesCurrent: state.statistic.valuesCurrent,
    caseType: state.statistic.formValues.caseType
});

const setMouseXY = statisticAC.setMouseXY;
const setMouseHoverCanvas = statisticAC.setMouseHoverCanvas;
const CanvasGraphContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {setMouseXY, setMouseHoverCanvas})(CanvasGraph);

export default CanvasGraphContainer;

//======================== TYPE ==========================
type MapStatePropsType = {
    period: number
    valuesCurrent: Array<number | null>
    caseType: CaseTypeType
}
type MapDispatchPropsType = {
    setMouseXY: (mouseX: number, mouseY: number) => void
    setMouseHoverCanvas: (mouseHoverCanvas: boolean) => void
}
export type CanvasGraphPropsType = MapStatePropsType & MapDispatchPropsType