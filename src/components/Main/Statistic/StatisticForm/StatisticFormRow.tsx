import Typography from "@material-ui/core/Typography";
import {Field, submit} from "redux-form";
import renderSelectField from "../../../common/renderSelectField";
import React, {ReactElement} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";
import {StatisticFormValuesType} from "../../../../types/types";
import {useDispatch} from "react-redux";
import blueGrey from "@material-ui/core/colors/blueGrey";

const StatisticFormRow: React.FC<PropsType> = (props): ReactElement => {
    const {fieldTitle, name, elements} = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const onChangeHandler = () => {
        setTimeout(() => dispatch(submit('statistic')));
    };
    return (
        <div className={classes.row}>
            <div className={classes.fieldName}>
                <Typography className={classes.typography}>
                    {fieldTitle}
                </Typography>
            </div>

            <Field name={name}
                   component={renderSelectField}
                   className={classes.selectField}
                   onChange={onChangeHandler}
            >
                {elements}
            </Field>
        </div>
    )
};
export default StatisticFormRow;
//============================= TYPE ============================
type PropsType = {
    fieldTitle: string
    name: keyof StatisticFormValuesType
    elements: Array<JSX.Element> | null
}

//====================== STYLES ============================
const useStyles = makeStyles({
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: 5,
        marginBottom: 2
    },
    fieldName: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: blueGrey[900],
        paddingRight: 15
    },
    typography: {
        color: grey[50],
    },
    selectField: {
        backgroundColor: grey[50],
        //paddingLeft: 10
    }
});
