import React, {ReactElement, useEffect} from 'react';
import SummaryCases from "./SummaryCases";
import {CountryCasesType, LangType, SummaryCountryType} from "../../../types/types";
import {translate} from "../../../helpers/translate";
import {DATE} from "../../../helpers/date";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@material-ui/core";
import Preloader from "../../common/Preloader";
import clsx from "clsx";
import useCommonQueryParams from "../../../hooks/useCommonQueryParams";
import {useDispatch, useSelector} from 'react-redux';
import {StringParam, useQueryParam} from "use-query-params";
import {getSummary, summaryAC} from "../../../store/reducers/summary-reducer";
import SelectCurrentCountry from "./SelectCurentCountry";
import {
    getCountriesCases,
    getCurrentCountry,
    getDate,
    getSummaryCases
} from "../../../store/selectors/summary-selector";
import {getIsLoading, getLang} from "../../../store/selectors/app-selector";

//========================= CUSTOM HOOK ====================
const useSummary = () => {
    useCommonQueryParams();
    const dispatch = useDispatch();
    const date = useSelector(getDate);
    const summaryCases = useSelector(getSummaryCases);
    const isLoading = useSelector(getIsLoading);
    const lang = useSelector(getLang);
    const countriesCases = useSelector(getCountriesCases);
    const currentCountry = useSelector(getCurrentCountry);

    useEffect(() => {
        dispatch(getSummary());
    }, []);

    const [countryQuery, setCountryQuery] = useQueryParam('country', StringParam);
    // URL => STATE
    useEffect(() => {
        dispatch(summaryAC.setCurrentCountry(countryQuery ? countryQuery : currentCountry));
    }, [dispatch]);
    // STATE => URL
    useEffect(() => {
        setCountryQuery(currentCountry !== 'Russian Federation' ? currentCountry : undefined);
    }, [
        currentCountry
    ]);

    const classes = useStyles();
    const currentCasesFull = countriesCases && countriesCases.find(el => el.Country === currentCountry)
    const currentCases = (currentCasesFull && {
        NewConfirmed: currentCasesFull.NewConfirmed,
        TotalConfirmed: currentCasesFull.TotalConfirmed,
        NewDeaths: currentCasesFull.NewDeaths,
        TotalDeaths: currentCasesFull.TotalDeaths,
        NewRecovered: currentCasesFull.NewRecovered,
        TotalRecovered: currentCasesFull.TotalRecovered
    }) as null | CountryCasesType;

    return {
        classes, currentCases, date, summaryCases,
        isLoading, lang
    }
};

//========================= COMPONENT ======================
const Summary: React.FC<{}> = (): ReactElement => {
    const {
        classes, currentCases, date, summaryCases,
        isLoading, lang
    } = useSummary();

    if (isLoading) return <Preloader/>;
    return (
        <>
            <div className={classes.blocks}>
                <div className={classes.block}>
                    <div className={clsx(classes.titleWrapper, classes.titleWrapper1)}>
                        <Typography variant='h5' align='center'>
                            {translate(lang, 'Global')}
                        </Typography>
                    </div>
                    <SummaryCases cases={summaryCases} lang={lang}/>
                </div>
                <div className={classes.block}>
                    <div className={classes.titleWrapper}>
                        <Typography variant='h5' align='center'>
                            {translate(lang, 'By country')}
                        </Typography>
                    </div>
                    <div>
                        <SelectCurrentCountry/>

                    </div>
                    <SummaryCases cases={currentCases} lang={lang}/>
                </div>
            </div>
            {
                date &&
                <Typography variant='subtitle1' align='center'>
                    {DATE.dateTranslateFromAPI(date, lang)}
                </Typography>
            }
        </>
    )
};

export default Summary;

//================== TYPE ==================
type PropsType = {
    date: string
    summaryCases: null | CountryCasesType
    isLoading: boolean
    lang: LangType
    countriesCases: null | Array<SummaryCountryType>
    currentCountry: string
}
//===================================== STYLES ===================================================
const useStyles = makeStyles({
    blocks: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: 20,
        margin: '0 20px 10px'
    },
    block: {
        border: '1px solid #fff',
        borderRadius: 10,
        padding: 10
    },
    titleWrapper: {
        marginBottom: 10,
        padding: '5px 0',
        border: '1px solid #fff',
        borderRadius: 10,
    },
    titleWrapper1: {
        marginBottom: 47
    }
});
