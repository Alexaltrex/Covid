import React, {ReactElement} from 'react';
import {Route, Switch} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";
import HomeContainer from "./Home/HomeContainer";
import Statistic from "./Statistic/Statistic";
import Summary from "./Summary/Summary";

const Main: React.FC = (): ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Switch>
                <Route exact path='/' render={() => <HomeContainer/>}/>
                <Route path='/summary' render={() => <Summary/>}/>
                <Route path='/statistic' render={() => <Statistic/>}/>
            </Switch>
        </div>
    )
};
export default Main;
//====================== STYLES ============================
const useStyles = makeStyles({
    main: {
        backgroundColor: grey[400],
        padding: '10px 10px 20px',
        flexGrow: 1,
    },
});
