import {connect} from "react-redux";
import React from "react";
import Statistic from "./Statistic";
import {getInitial, getValues} from "../../../store/statistic-reducer";

class StatisticAJAX extends React.Component {
    componentDidMount() {
        this.props.getInitial(this.props.period, this.props.currentCountry, this.props.type, this.props.caseType);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.period !== this.props.period || prevProps.currentCountry !== this.props.currentCountry) {
            this.props.getValues(this.props.dateEnd, this.props.period, this.props.currentCountry, this.props.type, this.props.caseType)
        }
    }

    render() {
        return <Statistic
            mouseHoverCanvas={this.props.mouseHoverCanvas}
            showInfo={this.props.showInfo}
        />
    }
}

let mapStateToProps = state => {
    return {
        isLoading: state.statisticPage.isLoading,
        period: state.statisticPage.period,
        currentCountry: state.statisticPage.currentCountry,
        xPoint: state.statisticPage.xPoint,
        yPoint: state.statisticPage.yPoint,
        dateEnd: state.statisticPage.dateEnd,
        type: state.statisticPage.type,
        caseType: state.statisticPage.caseType,
        showInfo: state.statisticPage.showInfo,
        mouseHoverCanvas: state.statisticPage.mouseHoverCanvas
    }
}

let StatisticContainer = connect(mapStateToProps, {getInitial, getValues})(StatisticAJAX);

export default StatisticContainer;