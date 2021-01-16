import React, {ReactElement} from 'react';
import {CANVAS} from "../../../../../helpers/canvas";
import {InfoType} from "./InfoContainer";
import Typography from '@material-ui/core/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import indigo from "@material-ui/core/colors/indigo";
import grey from "@material-ui/core/colors/grey";
import {addCommaToNumber} from "../../../../../helpers/addCommaToNumber";

const Info: React.FC<InfoType> = (props: InfoType): ReactElement => {
    const {period, mouseX, mouseY, caseType, setMouseHoverCanvas, infoValue, infoDate} = props;
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
        setMouseHoverCanvas(true);
    };

    let onMouseLeave = () => {
        setMouseHoverCanvas(false);
    };

    const infoValueLabel: string = infoValue
        ? addCommaToNumber(infoValue)
        : 'No data';

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