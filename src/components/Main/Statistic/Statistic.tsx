import React, {ReactElement} from 'react';
import CanvasContainer from "./Canvas/CanvasContainer";
import StatisticFormContainer from "./StatisticForm/StatisticFormContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";

const Statistic: React.FC = (): ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.statistic}>
            <div>
                <CanvasContainer/>
            </div>
            <div>
                <StatisticFormContainer/>
            </div>
        </div>
    )
};
export default Statistic;

//====================== STYLES ============================
const useStyles = makeStyles({
    statistic: {
        padding: '10px 10px 20px'
    },
});