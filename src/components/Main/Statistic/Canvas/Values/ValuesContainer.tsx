import {connect} from "react-redux";
import Values from "./Values";
import {StateType} from "../../../../../store/store";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    valuesCurrent: state.statistic.valuesCurrent,
});

const ValuesContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {})(Values);

export default ValuesContainer;

//======================== TYPE ==========================
type MapStatePropsType = {
    valuesCurrent: Array<number | null>
}
type MapDispatchPropsType = {}
export type ValuesPropsType = MapStatePropsType & MapDispatchPropsType