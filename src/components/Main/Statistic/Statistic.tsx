import React, {ReactElement, useEffect, useState} from 'react';
import CanvasContainer from "./Canvas/CanvasContainer";
import StatisticFormContainer from "./StatisticForm/StatisticFormContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LanErrorDialogContainer from "./LanErrorDialog/LanErrorDialog";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store/store";
import useCommonQueryParams from "../../../hooks/useCommonQueryParams";
import {StringParam, useQueryParam} from "use-query-params";
import {statisticAC} from "../../../store/statistic-reducer";
import {ByDayOrTotalType, CaseTypeType, PeriodType} from "../../../types/types";

//================== CUSTOM HOOK ==================
const useStatistic = () => {
    useCommonQueryParams();
    const classes = useStyles();
    const [lanErrorDialogOpen, setLanErrorDialogOpen] = useState(false);
    const lanError = useSelector((state: StateType) => state.app.lanError)

    useEffect(() => {
        if (lanError) {
            setLanErrorDialogOpen(true)
        }
    }, [lanError]);

    const dispatch = useDispatch();
    const formValues = useSelector((state: StateType) => state.statistic.formValues);
    const dateEnd = useSelector((state: StateType) => state.statistic.dateEnd);
    const [countryQuery, setCountryQuery] = useQueryParam('country', StringParam);
    const [periodQuery, setPeriodQuery] = useQueryParam('period', StringParam);
    const [byDayOrTotalQuery, setByDayOrTotalQuery] = useQueryParam('byDayOrTotal', StringParam);
    const [caseTypeQuery, setCaseTypeQuery] = useQueryParam('caseType', StringParam);
    const [dateEndQuery, setDateEndQuery] = useQueryParam('dateEnd', StringParam);

    // URL => STATE
    useEffect(() => {
        dispatch(statisticAC.setFormValues({
            country: countryQuery ? countryQuery : formValues.country,
            period: periodQuery ? periodQuery as PeriodType : formValues.period,
            byDayOrTotal: byDayOrTotalQuery ? byDayOrTotalQuery as ByDayOrTotalType : formValues.byDayOrTotal,
            caseType: caseTypeQuery ? caseTypeQuery as CaseTypeType : formValues.caseType,
        }));
        dispatch(statisticAC.setDateEnd(dateEndQuery ? dateEndQuery : dateEnd as string));

        // if (
        //     !(formValues.period === '-1' &&
        //         (formValues.caseType !== newFormValue.caseType || formValues.byDayOrTotal !== newFormValue.byDayOrTotal))
        // ) {
        //     setPeriod(+newFormValue.period);
        // }



    }, [dispatch]);
    // STATE => URL
    useEffect(() => {
        setCountryQuery(formValues.country !== 'russia' ? formValues.country : undefined);
        setPeriodQuery(formValues.period !== '14' ? formValues.period : undefined);
        setByDayOrTotalQuery(formValues.byDayOrTotal !== 'byDay' ? formValues.byDayOrTotal : undefined);
        setCaseTypeQuery(formValues.caseType !== 'confirmed' ? formValues.caseType : undefined);
        setDateEndQuery(dateEnd ? dateEnd : undefined)
        }, [
        formValues,
        dateEnd
    ]);

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
                <CanvasContainer/>
            </div>
            <div>
                <StatisticFormContainer/>
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