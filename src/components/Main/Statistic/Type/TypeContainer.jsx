import {connect} from "react-redux";
import Type from "./Type";
import {setCurrentValues, setType} from "../../../../store/statistic-reducer";


const mapStateToProps = (state) => ({
    type: state.statisticPage.type,
    caseType: state.statisticPage.caseType
});

const TypeContainer = connect(mapStateToProps, {setType, setCurrentValues})(Type);

export default TypeContainer;