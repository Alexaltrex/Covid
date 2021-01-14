import {connect} from "react-redux";
import React from "react";
import Statistic from "./Statistic";
import {getInitial, getValues, statisticAC} from "../../../store/statistic-reducer";
import {StateType} from "../../../store/store";
import {ByDayOrTotalType, CaseTypeType, PeriodType, StatisticFormValuesType} from "../../../types/types";

class StatisticAJAX extends React.Component<StatisticContainerPropsType, {}> {

    componentDidMount() {
        const {country, period, byDayOrTotal, caseType} = this.props.formValues;
        this.props.getInitial(period, country, byDayOrTotal, caseType);
        console.log('componentDidMount')
        // this.props.getInitial(period, country, byDayOrTotal, caseType);
        // this.props.getInitial(period, country, byDayOrTotal, caseType);
        // this.props.getInitial(period, country, byDayOrTotal, caseType);
        // this.props.getInitial(period, country, byDayOrTotal, caseType);
        // this.props.getInitial(period, country, byDayOrTotal, caseType);
    }

    componentDidUpdate(prevProps: StatisticContainerPropsType, prevState: StatisticContainerPropsType) {
        console.log(`prevProps.formValues.caseType = ${prevProps.formValues.caseType}`);
        console.log(`this.props.formValues.caseType = ${this.props.formValues.caseType}`);
        console.log('')
        const {country, period, byDayOrTotal, caseType} = this.props.formValues;
        // если изменилась страна или период - запрос на сервер
        if (this.props.dateEnd
            && (prevProps.formValues.period !== period
            || prevProps.formValues.country !== country)) {
            this.props.getValues(this.props.dateEnd, period, country, byDayOrTotal, caseType)
        }
        // если изменился только или тип за день/общее или тип случая - получить из стора
        if (
            prevProps.formValues.country === country
            && prevProps.formValues.period === period
            && (prevProps.formValues.byDayOrTotal !== byDayOrTotal
            || prevProps.formValues.caseType !== caseType)
        ) {
            this.props.setCurrentValues(byDayOrTotal, caseType);
            console.log('test')
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