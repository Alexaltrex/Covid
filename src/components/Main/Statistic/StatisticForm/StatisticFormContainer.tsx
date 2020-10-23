import {StateType} from "../../../../store/store";
import {CountryType, LangType, StatisticFormValuesType} from "../../../../types/types";
import {connect} from "react-redux";
import StatisticForm from "./StatisticForm";
import {statisticAC} from "../../../../store/statistic-reducer";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    countriesData: state.statistic.countriesData,
    formValues: state.statistic.formValues,
    lang: state.app.lang
});

const setFormValues = statisticAC.setFormValues;
const setPeriod = statisticAC.setPeriod;
const StatisticFormContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {setFormValues, setPeriod})(StatisticForm);

export default StatisticFormContainer;

//==================== TYPE ===================
type MapStatePropsType = {
    countriesData: null | Array<CountryType>
    formValues: StatisticFormValuesType
    lang: LangType
}
type MapDispatchPropsType = {
    setFormValues: (formValues: StatisticFormValuesType) => void
    setPeriod: (period: number) => void
}
export type StatisticFormPropsType = MapStatePropsType & MapDispatchPropsType;