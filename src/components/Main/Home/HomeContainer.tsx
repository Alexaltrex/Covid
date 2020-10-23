import {connect} from "react-redux";
import {StateType} from "../../../store/store";
import {LangType} from "../../../types/types";
import Home from "./Home";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    lang: state.app.lang,
});

const HomeContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {})(Home);

export default HomeContainer;

//======================== TYPE ==========================
type MapStatePropsType = {
    lang: LangType
}
type MapDispatchPropsType = {}
export type HomePropsType = MapStatePropsType & MapDispatchPropsType