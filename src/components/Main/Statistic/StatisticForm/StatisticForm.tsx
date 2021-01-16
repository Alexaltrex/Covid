import {InjectedFormProps, reduxForm} from "redux-form";
import {CountryType, LangType, StatisticFormValuesType} from "../../../../types/types";
import React, {ReactElement} from "react";
import StatisticFormRow from "./StatisticFormRow";
import {translate} from "../../../../helpers/translate";
import {useDispatch, useSelector} from "react-redux";
import {getCountriesData, getFormValuesSelector} from "../../../../store/selectors/statistic-selectors";
import {getLang} from "../../../../store/selectors/app-selector";
import {statisticAC} from "../../../../store/reducers/statistic-reducer";

//================================= FORM ===================================
const Form: React.FC<FormPropsType> = (props: FormPropsType): ReactElement => {
    const {
        handleSubmit, countriesData, lang
    } = props;
    const countryElements = countriesData?.map(
        (el, i) => (
            <option key={i}
                    value={el.Slug}>
                {el.Country}
            </option>
        )
    );

    const periodArray = [
        {label: translate(lang, '1 week'), value: 7},
        {label: translate(lang, '2 week'), value: 14},
        {label: translate(lang, '30 days'), value: 30},
        {label: translate(lang, 'By start'), value: -1}
    ];
    const periodElements = periodArray.map(
        (el, i) => (
            <option key={i}
                    value={el.value}>
                {el.label}
            </option>
        ));

    const byDayOrTotalArray = [
        {label: translate(lang, 'By day'), value: 'byDay'},
        {label: translate(lang, 'Total'), value: 'total'},
    ];
    const byDayOrTotalElements = byDayOrTotalArray.map(
        (el, i) => (
            <option key={i}
                    value={el.value}>
                {el.label}
            </option>
        ));

    const caseTypeArray = [
        {label: translate(lang, 'Confirmed'), value: 'confirmed'},
        {label: translate(lang, 'Recovered'), value: 'recovered'},
        {label: translate(lang, 'Deaths'), value: 'deaths'},
    ];
    const caseTypeElements = caseTypeArray.map(
        (el, i) => (
            <option key={i}
                    value={el.value}>
                {el.label}
            </option>
        ));

    return (
        <form onSubmit={handleSubmit}>
            <StatisticFormRow fieldTitle={translate(lang, 'Country')} name='country' elements={countryElements as Array<JSX.Element>}/>
            <StatisticFormRow fieldTitle={translate(lang, 'Period')} name='period' elements={periodElements}/>
            <StatisticFormRow fieldTitle={translate(lang, 'By day / Total')} name='byDayOrTotal'
                              elements={byDayOrTotalElements}/>
            <StatisticFormRow fieldTitle={translate(lang, 'Case type')} name='caseType' elements={caseTypeElements}/>
        </form>
    )
};

//============================ REDUX-FORM ====================================
const ReduxForm = reduxForm<StatisticFormValuesType, FormOwnPropsType>({
    form: 'statistic',
})(Form);

//=========================== COMPONENT =====================================
const StatisticForm: React.FC<{}> = (): ReactElement => {
    const dispatch = useDispatch();
    const countriesData = useSelector(getCountriesData);
    const lang = useSelector(getLang);
    const formValues = useSelector(getFormValuesSelector);

    const onSubmit = (newFormValue: StatisticFormValuesType) => {
        dispatch(statisticAC.setFormValues(newFormValue));
    };
    const initialValues: StatisticFormValuesType = formValues;
    return (
        <ReduxForm onSubmit={onSubmit}
                   enableReinitialize
                   initialValues={initialValues}
                   countriesData={countriesData}
                   lang={lang}
        />
    )
};

export default StatisticForm;

//============================= TYPE ============================
type FormPropsType = InjectedFormProps<StatisticFormValuesType,
    FormOwnPropsType> & FormOwnPropsType
type FormOwnPropsType = {
    countriesData: null | Array<CountryType>
    lang: LangType
};

