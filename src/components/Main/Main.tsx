import React, {ReactElement} from 'react';
import {Route, Switch} from "react-router-dom";
import SummaryContainer from "./Summary/SummaryContainer";
import StatisticContainer from "./Statistic/StatisticContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";
import HomeContainer from "./Home/HomeContainer";

const Main: React.FC = (): ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Switch>
                <Route exact path='/' render={() => <HomeContainer/>}/>
                <Route path='/summary' render={() => <SummaryContainer/>}/>
                <Route path='/statistic' render={() => <StatisticContainer/>}/>
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
