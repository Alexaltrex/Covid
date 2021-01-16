import React, {ReactElement} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@material-ui/core";
import {addCommaToNumber} from "../../../helpers/addCommaToNumber";

const SummaryCasesItem: React.FC<PropsType> = (props: PropsType): ReactElement => {
    const {color, caseType, value, icon} = props;
    const classes = useStyles();

    const useStylesInner = makeStyles({
        type: {
            flexGrow: 1,
            paddingLeft: 5,
            color: color
        },
        iconWrapper: {
            color: color
        }
    });
    const classesInner = useStylesInner();

    return (
        <div className={classes.item}>
            <Typography variant='h6'
                        className={classesInner.type}>
                {caseType}
            </Typography>

            <div className={classes.valueWrapper}>
                <div className={classesInner.iconWrapper}>
                    {icon}
                </div>

                <Typography variant='h6' className={classes.value}>
                    {addCommaToNumber(value)}
                </Typography>
            </div>
        </div>
    )
};

export default SummaryCasesItem;

//===================== TYPE =================
type PropsType = {
    color: string
    caseType: string
    value: number
    icon: ReactElement
}
//===================================== STYLES ===================================================
const useStyles = makeStyles({
    item: {
        display: 'flex',
        alignItems: 'center'
    },
    valueWrapper: {
        flexBasis: 180,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    value: {
        marginLeft: 10
    }
});