import {connect} from "react-redux";
import React from "react";
import Statistic from "./Statistic";
import {getInitial, getValues, statisticAC} from "../../../store/statistic-reducer";
import {StateType} from "../../../store/store";
import {ByDayOrTotalType, CaseTypeType, PeriodType, StatisticFormValuesType} from "../../../types/types";

class StatisticAJAX extends React.Component<StatisticContainerPropsType, {}> {
    componentDidMount() {
        const period = this.props.formValues.period;
        const country = this.props.formValues.country;
        const byDayOrTotal = this.props.formValues.byDayOrTotal;
        const caseType = this.props.formValues.caseType;
        this.props.getInitial(period, country, byDayOrTotal, caseType);
    }
    componentDidUpdate(prevProps: StatisticContainerPropsType, prevState: StatisticContainerPropsType) {
        const period = this.props.formValues.period;
        const country = this.props.formValues.country;
        const byDayOrTotal = this.props.formValues.byDayOrTotal;
        const caseType = this.props.formValues.caseType;
        // если изменилась страна или период - получить с сервера
        if (this.props.dateEnd
            && (prevProps.formValues.period !== this.props.formValues.period
            || prevProps.formValues.country !== this.props.formValues.country)) {
            this.props.getValues(this.props.dateEnd, period, country, byDayOrTotal, caseType)
        }
        // если изменился только или тип за день/общее или тип случая - получить из стора
        if (
            prevProps.formValues.country === this.props.formValues.country
            && prevProps.formValues.period === this.props.formValues.period
            && (prevProps.formValues.byDayOrTotal !== this.props.formValues.byDayOrTotal
            || prevProps.formValues.caseType !== this.props.formValues.caseType)
        ) {
            this.props.setCurrentValues(byDayOrTotal, caseType);
        }
    }
    render() {
        return <Statistic />
    }
}

let mapStateToProps = (state: StateType): MapStatePropsType => ({
    isInitialized: state.statistic.isInitialized,
    isLoading: state.app.isLoading,
    dateEnd: state.statistic.dateEnd,
    formValues: state.statistic.formValues
});

const setCurrentValues = statisticAC.setCurrentValues;
let StatisticContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {getInitial, getValues, setCurrentValues})(StatisticAJAX);
export default StatisticContainer;

//====================== TYPE =========================
type MapStatePropsType = {
    isInitialized: boolean
    isLoading: boolean
    dateEnd: string | null
    formValues: StatisticFormValuesType
}
type MapDispatchPropsType = {
    getInitial: (period: PeriodType, country: string, byDayOrTotal: ByDayOrTotalType, caseType: CaseTypeType) => void
    getValues: (dateEnd: string, period: PeriodType, country: string, byDayOrTotal: ByDayOrTotalType, caseType: CaseTypeType) => void
    setCurrentValues: (byDayOrTotal: ByDayOrTotalType, caseType: CaseTypeType) => void
}
type StatisticContainerPropsType = MapStatePropsType & MapDispatchPropsType;