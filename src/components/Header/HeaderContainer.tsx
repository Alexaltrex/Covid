import Header from "./Header";
import {LangType} from "../../types/types";
import {StateType} from "../../store/store";
import {connect} from "react-redux";
import {appAC} from "../../store/app-reducer";


let mapStateToProps = (state: StateType): MapStatePropsType => ({
    lang: state.app.lang
});

const setLang = appAC.setLang;
let HeaderContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {setLang})(Header);
export default HeaderContainer;

//====================== TYPE =========================
type MapStatePropsType = {
    lang: LangType
}
type MapDispatchPropsType = {}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType;