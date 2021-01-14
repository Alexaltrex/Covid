import {connect} from "react-redux";
import {StateType} from "../../../../store/store";
import CanvasAll from "./CanvasAll";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    valuesCurrent: state.statistic.valuesCurrent,
    mouseHoverCanvas: state.statistic.mouseHoverCanvas,
    showInfo: state.statistic.showInfo,
    isLoading: state.app.isLoading,
    lanError: state.app.lanError
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
    lanError: boolean
}
type MapDispatchPropsType = {}
export type CanvasPropsType = MapStatePropsType & MapDispatchPropsType