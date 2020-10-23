import {connect} from "react-redux";
import Info from "./Info";
import {statisticAC} from "../../../../../store/statistic-reducer";
import {CaseTypeType} from "../../../../../types/types";
import {StateType} from "../../../../../store/store";

const mapStateToProps = (state: StateType): MapStatePropsType  => ({
    mouseX: state.statistic.mouseX,
    period: state.statistic.period,
    caseType: state.statistic.formValues.caseType,
    mouseY: state.statistic.mouseY,
    infoValue: state.statistic.infoValue,
    infoDate: state.statistic.infoDate
});

const setMouseHoverCanvas = statisticAC.setMouseHoverCanvas;
const InfoContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,{setMouseHoverCanvas})(Info);

export default InfoContainer;

//=================== TYPE ========================
type MapStatePropsType = {
    mouseX: number
    mouseY: number
    period: number
    caseType: CaseTypeType
    infoValue: null | number
    infoDate: string | null
}
type MapDispatchPropsType = {
    setMouseHoverCanvas: (mouseHoverCanvas: boolean) => void
}
export type InfoType = MapStatePropsType & MapDispatchPropsType;