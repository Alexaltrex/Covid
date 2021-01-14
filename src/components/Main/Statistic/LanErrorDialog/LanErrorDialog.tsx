import {connect, useDispatch} from "react-redux";
import {StateType} from "../../../../store/store";
import {appAC} from "../../../../store/app-reducer";
import * as React from "react";
import {FormValuesType, LanErrorResponseType, LangType, PeriodType} from "../../../../types/types";
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {getInitial} from "../../../../store/statistic-reducer";
import {translate} from "../../../../helpers/translate";

const LanErrorDialog: React.FC<PropsType> = (props: PropsType) => {
    const {
        lanErrorResponse, setLanError, setLanErrorResponse,
        lanErrorDialogOpen, setLanErrorDialogOpen, formValues,
        lanError, lang
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [count, setCount] = useState(10);

    useEffect(() => {
        if (lanError) {
            if (count > 0) {
                setTimeout(() => {
                    setCount(count - 1)
                }, 1000)
            } else {
                setLanErrorDialogOpen(false);// закрыть форму
                setLanError(false);// снять флаг сетевой ошибки
                setLanErrorResponse(null);// обнулить сообщение об ошибке
                setCount(10);//
                dispatch(getInitial(formValues.period, formValues.country, formValues.byDayOrTotal, formValues.caseType))
            }
        }

    }, [count, lanError, dispatch])

    const onReloadHandle = () => {
        setLanErrorDialogOpen(false);// закрыть форму
        setLanError(false);// снять флаг сетевой ошибки
        setLanErrorResponse(null);// обнулить сообщение об ошибке
        setCount(10);//
        dispatch(getInitial(formValues.period, formValues.country, formValues.byDayOrTotal, formValues.caseType))
    };

    const OnExitHandle = () => {
        setLanErrorDialogOpen(false);// закрыть форму
    };

    const label01 = translate(lang, 'Automatically retry server request in');
    const label02 = translate(lang, 'sec');

    return (
        <>
            {
                lanErrorResponse &&
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                    open={lanErrorDialogOpen}
                    className={classes.dialog}
                >
                    <DialogTitle id="confirmation-dialog-title"
                                 className={classes.dialogTitle}
                    >
                        <div className={classes.dialogTitleInner}>
                            <ErrorOutlineIcon className={classes.icon}/>
                            <Typography>
                                Lan error with status {lanErrorResponse.status}
                            </Typography>
                        </div>

                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            {lanErrorResponse.message}
                        </Typography>
                        <Typography color='secondary'>
                            {label01}:
                        </Typography>
                        <Typography color='secondary' align='center'>
                            {count} {label02}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <div className={classes.buttonWrapper}>
                            <Button onClick={onReloadHandle}
                                    variant='contained'
                                    color="primary"
                                    fullWidth
                                    className={classes.button}
                            >
                                Reload data from server
                            </Button>
                            <Button onClick={OnExitHandle}
                                    variant='contained'
                                    color="primary"
                                    fullWidth
                                    className={classes.button}
                            >
                                Exit
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

//====================== CONTAINER ============================
const mapStateToProps = (state: StateType) => ({
    lanErrorResponse: state.app.lanErrorResponse,
    formValues: state.statistic.formValues,
    lanError: state.app.lanError,
    lang: state.app.lang
});
const setLanError = appAC.setLanError;
const setLanErrorResponse = appAC.setLanErrorResponse;
const LanErrorDialogContainer = connect<MapStatePropsType, MapDispatchPropsType,
    OwnPropsType, StateType>
(mapStateToProps, {setLanError, setLanErrorResponse})(LanErrorDialog);

export default LanErrorDialogContainer;

//====================== TYPE ========================
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

type MapStatePropsType = {
    lanErrorResponse: null | LanErrorResponseType
    formValues: FormValuesType
    lanError: boolean
    lang: LangType
}
type MapDispatchPropsType = {
    setLanError: (lanError: boolean) => void
    setLanErrorResponse: (lanErrorResponse: null | LanErrorResponseType) => void
}
type OwnPropsType = {
    lanErrorDialogOpen: boolean
    setLanErrorDialogOpen: (lanErrorDialogOpen: boolean) => void
}
//====================== STYLES ============================
const useStyles = makeStyles({
    dialog: {
        //maxWidth: 550
    },
    button: {
        textTransform: 'none',
        '&:not(:last-child)': {
            marginBottom: 10
        }
    },
    dialogTitle: {
        backgroundColor: red[500],
    },
    dialogTitleInner: {
        color: grey[50],
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: 10,
    },
    buttonWrapper: {
        flexGrow: 1
    }

});