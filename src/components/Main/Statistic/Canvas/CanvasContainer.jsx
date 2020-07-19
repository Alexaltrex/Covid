import {connect} from "react-redux";
import {setMouseHoverCanvas, setMouseXY, setShowInfo} from "../../../../store/statistic-reducer";
import Canvas from "./Canvas";

const mapStateToProps = (state) => ({
    period: state.statisticPage.period,
    //periodByFirstDay: state.statisticPage.periodByFirstDay,
    valuesCurrent: state.statisticPage.valuesCurrent,
    mouseHoverCanvas: state.statisticPage.mouseHoverCanvas,
    mouseX: state.statisticPage.mouseX,
    mouseY: state.statisticPage.mouseY,
    dates: state.statisticPage.dates,
    currentCountry: state.statisticPage.currentCountry,
    type: state.statisticPage.type,
    caseType: state.statisticPage.caseType,
    showInfo: state.statisticPage.showInfo,
    xPoint: state.statisticPage.xPoint,
    yPoint: state.statisticPage.yPoint,
    isLoading: state.statisticPage.isLoading
});

const CanvasContainer = connect(mapStateToProps, {setMouseXY, setMouseHoverCanvas, setShowInfo})(Canvas);

export default CanvasContainer;