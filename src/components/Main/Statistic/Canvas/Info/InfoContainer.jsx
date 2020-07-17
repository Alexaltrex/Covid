import React from 'react';
import {connect} from "react-redux";
import Info from "./Info";
import {setMouseHoverCanvas} from "../../../../../store/statistic-reducer";

const mapStateToProps = (state) => ({
    mouseX: state.statisticPage.mouseX,
    period: state.statisticPage.period,
    caseType: state.statisticPage.caseType,
    mouseY: state.statisticPage.mouseY,
    infoValue: state.statisticPage.infoValue,
    infoDate: state.statisticPage.infoDate
})


const InfoContainer = connect(mapStateToProps,{setMouseHoverCanvas})(Info);

export default InfoContainer;