import {connect} from "react-redux";
import React from "react";
import Summary from "./Summary";
import {getSummary} from "../../../store/summary-reducer";
import {StateType} from "../../../store/store";
import {CountryCasesType, LangType, SummaryCountryType} from "../../../types/types";

class SummaryAJAX extends React.Component<SummaryPropsType, {}> {
    componentDidMount() {
        this.props.getSummary();
    }

    render() {
        const {getSummary, ...other} = this.props
        return <Summary {...other}/>
    }
}

const mapStateToProps = (state: StateType) => ({
    date: state.summary.date,
    summaryCases: state.summary.summaryCases,
    isLoading: state.app.isLoading,
    lang: state.app.lang,
    countriesCases: state.summary.countriesCases,
    currentCountry: state.summary.currentCountry
});

const SummaryContainer = connect<MapStatePropsType, MapDispatchPropsType,
    OwnPropsType, StateType>
(mapStateToProps, {getSummary})(SummaryAJAX);

export default SummaryContainer;

//============== TYPE ========================
type SummaryPropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    date: string
    summaryCases: null | CountryCasesType
    isLoading: boolean
    lang: LangType
    countriesCases: null | Array<SummaryCountryType>
    currentCountry: string
}
type MapDispatchPropsType = {
    getSummary: () => void
}
type OwnPropsType = {}