import {StateType} from "../../../store/store";
import {connect} from "react-redux";
import {LangType} from "../../../types/types";
import LangSwitcher from "./LangSwitcher";
import {appAC} from "../../../store/app-reducer";

let mapStateToProps = (state: StateType): MapStatePropsType => ({
    lang: state.app.lang
});

const setLang = appAC.setLang;
let LangSwitcherContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {setLang})(LangSwitcher);
export default LangSwitcherContainer;

//====================== TYPE =========================
type MapStatePropsType = {
    lang: LangType
}
type MapDispatchPropsType = {
    setLang: (lang: LangType) => void
}
export type LangSwitcherPropsType = MapStatePropsType & MapDispatchPropsType;