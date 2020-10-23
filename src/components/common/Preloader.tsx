import {CircularProgress} from "@material-ui/core";
import React, {ReactElement} from "react";
import {makeStyles} from "@material-ui/core/styles";

//======================= COMPONENT ===============================
const Preloader: React.FC = (): ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.circularWrapper}>
            <CircularProgress size={200} color='primary' />
        </div>
    )
};

export default Preloader;

//============================ STYLES =======================================================
const useStyles = makeStyles({
    circularWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1001
    }
});
