import {connect} from "react-redux";
import React from "react";
import Summary from "./Summary";
import {getInitial} from "../../../store/summary-reducer";

class SummaryAJAX extends React.Component {
    componentDidMount() {
        this.props.getInitial();
    }

    componentDidUpdate(prevProps) {
    }

    render() {
       return <Summary date={this.props.date}
                        global={this.props.global}
                        cases={this.props.cases}/>
    }
}


let mapStateToProps = state => {
    return {
        date: state.summaryPage.date,
        global: state.summaryPage.global,
        cases: state.summaryPage.cases,
        isLoading: state.summaryPage.isLoading
    }
}

let SummaryContainer = connect(mapStateToProps, {getInitial})(SummaryAJAX);

export default SummaryContainer;