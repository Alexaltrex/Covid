import {useDispatch, useSelector} from "react-redux";
import {StringParam, useQueryParam} from "use-query-params";
import {useEffect} from "react";
import {LangType} from "../types/types";
import {StateType} from "../store/store";
import {appAC} from "../store/app-reducer";

const useCommonQueryParams = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state: StateType) => state.app.lang);

    const [langQuery, setLangQuery] = useQueryParam('lang', StringParam);

    // URL => STATE
    useEffect(() => {
        dispatch(appAC.setLang(langQuery ? langQuery as LangType : lang));
           }, [dispatch]);
    // STATE => URL
    useEffect(() => {
        setLangQuery(lang !== 'eng' ? lang : undefined);
            }, [
        lang,
    ]);
}
export default useCommonQueryParams;