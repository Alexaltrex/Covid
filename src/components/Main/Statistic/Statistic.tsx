import React, {ReactElement, useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import LanErrorDialogContainer from "./LanErrorDialog/LanErrorDialog";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store/store";
import useCommonQueryParams from "../../../hooks/useCommonQueryParams";
import {StringParam, useQueryParam} from "use-query-params";
import {getInitial, getValues, statisticAC} from "../../../store/reducers/statistic-reducer";
import {ByDayOrTotalType, CaseTypeType, PeriodType} from "../../../types/types";
import {getDateEnd, getFormValuesSelector} from "../../../store/selectors/statistic-selectors";
import StatisticForm from "./StatisticForm/StatisticForm";
import CanvasAll from "./Canvas/CanvasAll";

//================== CUSTOM HOOK ==================
const useStatistic = () => {
    useCommonQueryParams(); // обработка общих Query параметров
    const classes = useStyles();
    const [lanErrorDialogOpen, setLanErrorDialogOpen] = useState(false);
    const lanError = useSelector((state: StateType) => state.app.lanError);
    const dateEnd = useSelector(getDateEnd);
    const dispatch = useDispatch();
    const formValues = useSelector(getFormValuesSelector);
    const {country, period, byDayOrTotal, caseType} = formValues;

    const [countryQuery, setCountryQuery] = useQueryParam('country', StringParam);
    const [periodQuery, setPeriodQuery] = useQueryParam('period', StringParam);
    const [byDayOrTotalQuery, setByDayOrTotalQuery] = useQueryParam('byDayOrTotal', StringParam);
    const [caseTypeQuery, setCaseTypeQuery] = useQueryParam('caseType', StringParam);
    const [dateEndQuery, setDateEndQuery] = useQueryParam('dateEnd', StringParam);

    // URL => STATE
    // первоначальная инициализация
    useEffect(() => {
        const countryInitial = countryQuery ? countryQuery : country;
        const periodInitial = periodQuery ? periodQuery as PeriodType : period;
        const byDayOrTotalInitial = byDayOrTotalQuery ? byDayOrTotalQuery as ByDayOrTotalType : byDayOrTotal;
        const caseTypeInitial = caseTypeQuery ? caseTypeQuery as CaseTypeType : caseType;
        dispatch(statisticAC.setFormValues({
            country: countryInitial,
            period: periodInitial,
            byDayOrTotal: byDayOrTotalInitial,
            caseType: caseTypeInitial,
        }));
        dispatch(statisticAC.setDateEnd(dateEndQuery ? dateEndQuery : dateEnd as string));
        dispatch(getInitial(periodInitial, countryInitial, byDayOrTotalInitial, caseTypeInitial))
    }, [dispatch]);

    // STATE => URL
    useEffect(() => {
        setCountryQuery(country !== 'russia' ? country : undefined);
        setPeriodQuery(period !== '14' ? period : undefined);
        setByDayOrTotalQuery(byDayOrTotal !== 'byDay' ? byDayOrTotal : undefined);
        setCaseTypeQuery(caseType !== 'confirmed' ? caseType : undefined);
        setDateEndQuery(dateEnd ? dateEnd : undefined)
    }, [formValues, dateEnd]);

    // обработка данных из формы
    // если изменилась country или period - запрос на сервер
    useEffect(() => {
        if (dateEnd) {
            dispatch(getValues(dateEnd, period, country, byDayOrTotal, caseType));
        }
    }, [country, period, dispatch]);

    useEffect(()=> {
        if (+period !== -1) {
            dispatch(statisticAC.setPeriod(+period))
        }
    }, [period]);

    // если изменился только или byDayOrTotal или caseType - получить из store
    useEffect(() => {
        dispatch(statisticAC.setCurrentValues(byDayOrTotal, caseType));
    }, [byDayOrTotal, caseType, dispatch]);

    // обработка сетевой ошибки
    useEffect(() => {
        if (lanError) {
            setLanErrorDialogOpen(true)
        }
    }, [lanError]);







    return {
        classes, lanErrorDialogOpen, setLanErrorDialogOpen
    }
};

//================== COMPONENT ====================
const Statistic: React.FC = (): ReactElement => {
    const {
        classes, lanErrorDialogOpen, setLanErrorDialogOpen
    } = useStatistic();

    return (
        <div className={classes.statistic}>
            <div>
                <CanvasAll/>
            </div>
            <div>
                <StatisticForm/>
            </div>
            <LanErrorDialogContainer lanErrorDialogOpen={lanErrorDialogOpen}
                                     setLanErrorDialogOpen={setLanErrorDialogOpen}
            />
        </div>
    )
};
export default Statistic;

//====================== STYLES ============================
const useStyles = makeStyles({
    statistic: {
        padding: '10px 10px 20px'
    },
});