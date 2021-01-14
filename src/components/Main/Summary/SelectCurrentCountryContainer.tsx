import {StateType} from "../../../store/store";
import {connect} from "react-redux";
import SelectCurrentCountry from "./SelectCurentCountry";
import {summaryAC} from "../../../store/summary-reducer";

const mapStateToProps = (state: StateType) => ({
    summaryCases: state.summary.summaryCases,
    countriesList: state.summary.countriesList,
    currentCountry: state.summary.currentCountry
});


const setCurrentCountry = summaryAC.setCurrentCountry;
const SelectCurrentCountryContainer = connect<MapStatePropsType, MapDispatchPropsType,
    OwnPropsType, StateType>
(mapStateToProps, {setCurrentCountry})(SelectCurrentCountry);

export default SelectCurrentCountryContainer;

//============== TYPE ========================
export type SelectCurrentCountryPropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    countriesList: Array<string>
    currentCountry: string
}
type MapDispatchPropsType = {
    setCurrentCountry: (currentCountry: string) => void

}
type OwnPropsType = {}