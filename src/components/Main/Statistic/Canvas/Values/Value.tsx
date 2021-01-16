import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {addCommaToNumber} from "../../../../../helpers/addCommaToNumber";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";

const Value: React.FC<PropsType> = (props: PropsType) => {
    const {top, left, value} = props;
    const classes = useStyles();
    let styleInline = {top: top, left: left};
    return (
        <div className={classes.value} style={styleInline}>
            {addCommaToNumber(value)}
        </div>
    )
};

export default Value;

//====================== TYPE ==========================
type PropsType = {
    top: number
    left: number
    value: number
}
//======================= STYLE =======================
const useStyles = makeStyles({
    value: {
        position: 'absolute',
        transform: 'translate(-100%, -50%)',
        backgroundColor: blueGrey[600],
        color: grey[50],
        zIndex: 100,
        padding: '2px 4px',
        borderRadius: 1
    },
});