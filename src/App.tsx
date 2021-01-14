import React from 'react';
import Main from "./components/Main/Main";
import makeStyles from "@material-ui/core/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";
import HeaderContainer from "./components/Header/HeaderContainer";

//================ CONTAINER =================
const App = () => {
    const classes = useStyles();
    return (
        <div className={classes.appWrapper}>
            <div className={classes.app}>
                <HeaderContainer/>
                <Main/>
            </div>
        </div>
    )
};

export default App;
//====================== STYLES ============================
const useStyles = makeStyles({
    appWrapper: {
        backgroundColor: grey[100]
    },
    app: {
        maxWidth: 1120,
        width: '100%',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
});