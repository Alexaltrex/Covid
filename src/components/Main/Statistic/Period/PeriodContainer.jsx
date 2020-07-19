import {connect} from "react-redux";
import Period from "./Period";
import {setPeriod} from "../../../../store/statistic-reducer";


const mapStateToProps = (state) => ({
    periodInput: state.statisticPage.periodInput,
});

const PeriodContainer = connect(mapStateToProps, {setPeriod})(Period);

export default PeriodContainer;