import {changeCases, setCurrentCountry} from "../../../../store/summary-reducer";
import {connect} from "react-redux";
import Country from "./Country";

const mapStateToProps = (state) => ({
    currentCountry: state.summaryPage.currentCountry,
    countriesList: state.summaryPage.countriesList
});

const CountryContainer = connect(mapStateToProps, {setCurrentCountry, changeCases})(Country);

export default CountryContainer;