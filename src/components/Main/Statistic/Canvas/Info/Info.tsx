import React, {ReactElement} from 'react';
import {CANVAS} from "../../../../../helpers/canvas";
import Typography from '@material-ui/core/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import indigo from "@material-ui/core/colors/indigo";
import grey from "@material-ui/core/colors/grey";
import {addCommaToNumber} from "../../../../../helpers/addCommaToNumber";
import {useDispatch, useSelector} from "react-redux";
import {
    getFormValuesSelector, getInfoDate, getInfoValue,
    getMouseX,
    getMouseY,
    getPeriod
} from "../../../../../store/selectors/statistic-selectors";
import {statisticAC} from "../../../../../store/reducers/statistic-reducer";

//================== CUSTOM HOOK ==================
const useInfo = () => {
    const dispatch = useDispatch();
    const period = useSelector(getPeriod);
    const mouseX = useSelector(getMouseX);
    const mouseY = useSelector(getMouseY);
    const caseType = useSelector(getFormValuesSelector).caseType;
    const infoValue = useSelector(getInfoValue);
    const infoDate = useSelector(getInfoDate);

    const classes = useStyles();
    let left: number;
    const deltaX = (CANVAS.canvasW() - CANVAS.marginLeftX - CANVAS.marginRightX - CANVAS.paddingLeftX) / (period - 1);
    let canvasX = (i: number) => {
        return CANVAS.marginLeftX + CANVAS.paddingLeftX + i * deltaX;
    };
    let iMouseGrid = Math.round((mouseX - CANVAS.paddingLeftX - CANVAS.marginLeftX) / deltaX);
    let xMouseGrid = iMouseGrid && canvasX(iMouseGrid);
    // курсор в границах графика
    const showInfo = (mouseX > CANVAS.marginLeftX + CANVAS.paddingLeftX)
        && (mouseX < CANVAS.canvasW() - CANVAS.marginRightX);
    left = xMouseGrid;
    let styleInfo = {
        top: mouseY - 50,
        left: left + 10
    };
    let colorValue;
    if (caseType === 'confirmed') colorValue = red[600];
    if (caseType === 'recovered') colorValue = green[600];
    if (caseType === 'deaths') colorValue = indigo[600];
    let styleValue = {
        color: colorValue
    };

    let onMouseEnter = () => {
        dispatch(statisticAC.setMouseHoverCanvas(true));
    };

    let onMouseLeave = () => {
        dispatch(statisticAC.setMouseHoverCanvas(false));
    };

    const infoValueLabel: string = (infoValue || infoValue === 0)
        ? addCommaToNumber(infoValue)
        : 'No data';
    return {
        showInfo, onMouseEnter, onMouseLeave, styleInfo,
        classes, styleValue, infoValueLabel, infoDate
    }
}


//================== COMPONENT ====================
const Info: React.FC<{}> = (): ReactElement => {
    const {
        showInfo, onMouseEnter, onMouseLeave, styleInfo,
        classes, styleValue, infoValueLabel, infoDate
    } = useInfo();



    return (
        <>
            {
                showInfo &&
                <div onMouseEnter={onMouseEnter}
                     onMouseLeave={onMouseLeave}
                     style={styleInfo}
                     className={classes.info}>

                    <Typography variant='body1'
                                style={styleValue}
                                className={classes.value}
                    >
                        {infoValueLabel}
                    </Typography>

                    <Typography variant='body1'
                                color='textPrimary'
                    >
                        {infoDate}
                    </Typography>
                </div>
            }
        </>
    )
};

export default Info;

//====================== STYLES ============================
const useStyles = makeStyles({
    info: {
        position: 'absolute',
        backgroundColor: grey[50],
        zIndex: 101,
        cursor: 'default',
        padding: '2px 5px',
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
    },
    value: {
        fontWeight: 700
    }
});