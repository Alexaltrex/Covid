import {ReactElement} from "react";
import React from "react";
import {Field, InjectedFormProps, reduxForm, submit} from "redux-form";
import renderSelectField from "../../common/renderSelectField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {getCountriesList, getCurrentCountry} from "../../../store/selectors/summary-selector";
import {summaryAC} from "../../../store/reducers/summary-reducer";

//================================= FORM ===================================
const Form: React.FC<FormPropsType> = (props) => {
    const {handleSubmit, countriesList} = props;
    const classes = useStyles();
    const optionElements = countriesList && countriesList
        .map((el, i) => <option key={i}
                                value={el}>
                {el}
            </option>
        );
    const dispatch = useDispatch();

    const onChangeHandler = () => {
        setTimeout(() => dispatch(submit('summary-country')));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.fieldWrapper}>
                <Field name='country'
                       component={renderSelectField}
                       className={classes.selectField}
                       onChange={onChangeHandler}
                >
                    {optionElements}
                </Field>
            </div>

        </form>
    );
};

//============================ REDUX-FORM ====================================
const ReduxForm = reduxForm<FormValuesType, FormOwnPropsType>({
    form: 'summary-country',
})(Form);

//========================== CUSTOM HOOK ========================
const useSelectCurrentCountry = () => {
    const currentCountry = useSelector(getCurrentCountry);
    const countriesList = useSelector(getCountriesList)
    const dispatch = useDispatch();
    const onSubmit = (formValue: FormValuesType) => {
        dispatch(summaryAC.setCurrentCountry(formValue.country));
    };
    const initialValues: FormValuesType = {
        country: currentCountry
    };
    return {
        countriesList, onSubmit, initialValues
    }
};

//=========================== COMPONENT =====================================
const SelectCurrentCountry: React.FC<{}> = (): ReactElement => {
    const {
        countriesList, onSubmit, initialValues
    } = useSelectCurrentCountry();

    return (
        <ReduxForm onSubmit={onSubmit}
                   initialValues={initialValues}
                   countriesList={countriesList}
        />
    )
};

export default SelectCurrentCountry;

//========================== TYPE ============================
type FormPropsType = InjectedFormProps<FormValuesType, FormOwnPropsType> & FormOwnPropsType;
type FormValuesType = {
    country: string
};
type FormOwnPropsType = {
    countriesList: Array<string>
}

//====================== STYLES ============================
const useStyles = makeStyles({
    fieldWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginBottom: 5
    },
    selectField: {
        backgroundColor: 'white',
        paddingLeft: 5,
        width: '100%'
    },
});



