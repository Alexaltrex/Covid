import {connect} from "react-redux";
import Period from "./Period";
import {setPeriod} from "../../../../store/statistic-reducer";


const mapStateToProps = (state) => ({
    period: state.statisticPage.period,
});

const PeriodContainer = connect(mapStateToProps, {setPeriod})(Period);

export default PeriodContainer;