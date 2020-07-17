import {connect} from "react-redux";
import {setCurrentCountry} from "../../../../store/statistic-reducer";
import Country from "./Country";


const mapStateToProps = (state) => ({
    currentCountry: state.statisticPage.currentCountry,
    countriesData: state.statisticPage.countriesData
});

const CountryContainer = connect(mapStateToProps, {setCurrentCountry})(Country);

export default CountryContainer;