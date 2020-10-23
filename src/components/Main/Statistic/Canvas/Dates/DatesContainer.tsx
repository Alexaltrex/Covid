import {connect} from "react-redux";
import {StateType} from "../../../../../store/store";
import Dates from "./Dates";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    dates: state.statistic.dates,
    period: state.statistic.period,
});

const DatesContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {})(Dates);

export default DatesContainer;

//======================== TYPE ==========================
type MapStatePropsType = {
    dates: Array<string>
    period: number
}
type MapDispatchPropsType = {}
export type DatesPropsType = MapStatePropsType & MapDispatchPropsType