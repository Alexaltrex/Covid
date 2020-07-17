import {connect} from "react-redux";
import CaseType from "./CaseType";
import {setCaseType, setCurrentValues} from "../../../../store/statistic-reducer";


const mapStateToProps = (state) => ({
    caseType: state.statisticPage.caseType,
    type: state.statisticPage.type
});

const CaseTypeContainer = connect(mapStateToProps, {setCaseType, setCurrentValues})(CaseType);

export default CaseTypeContainer;