import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";

const Date: React.FC<PropsType> = (props: PropsType) => {
    const {top, left, date} = props;
    const classes = useStyles();

    let styleInline = {
        top: top,
        left: left
    };

    return (
        <div className={classes.date} style={styleInline}>
            {date}
        </div>
    )
};

export default Date;

//==================== TYPE ======================
type PropsType = {
    top: number
    left: number
    date: string
}
//====================== STYLES ============================
const useStyles = makeStyles({
    date: {
        position: 'absolute',
        transform: 'translate(-50%, 5px)',
        backgroundColor: blueGrey[600],
        color: grey[50],
        zIndex: 100,
        padding: '2px 4px',
        borderRadius: 1,
    },
});