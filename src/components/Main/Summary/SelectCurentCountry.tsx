import {ReactElement} from "react";
import React from "react";
import {Field, InjectedFormProps, reduxForm, submit} from "redux-form";
import renderSelectField from "../../common/renderSelectField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {SelectCurrentCountryPropsType} from "./SelectCurrentCountryContainer";
import {useDispatch} from "react-redux";

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

//=========================== COMPONENT =====================================
const SelectCurrentCountry: React.FC<ComponentPropsType> = (props: ComponentPropsType): ReactElement => {
    const {setCurrentCountry, currentCountry, countriesList} = props;
    const onSubmit = (formValue: FormValuesType) => {
        setCurrentCountry(formValue.country);
    };
    const initialValues: FormValuesType = {
        country: currentCountry
    };
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
type ComponentPropsType = SelectCurrentCountryPropsType;

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



