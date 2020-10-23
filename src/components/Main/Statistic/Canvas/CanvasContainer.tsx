import {connect} from "react-redux";
import {StateType} from "../../../../store/store";
import CanvasAll from "./CanvasAll";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    valuesCurrent: state.statistic.valuesCurrent,
    mouseHoverCanvas: state.statistic.mouseHoverCanvas,
    showInfo: state.statistic.showInfo,
    isLoading: state.app.isLoading
});

const CanvasContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {})(CanvasAll);

export default CanvasContainer;

//======================== TYPE ==========================
type MapStatePropsType = {
    valuesCurrent: Array<number | null>
    mouseHoverCanvas: boolean
    showInfo: boolean
    isLoading: boolean
}
type MapDispatchPropsType = {}
export type CanvasPropsType = MapStatePropsType & MapDispatchPropsType