import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CANVAS} from "../../../../helpers/canvas";
import CanvasAxisMemo from "./CanvasAxis";
import Preloader from "../../../common/Preloader";
import Dates from "./Dates/Dates";
import Info from "./Info/Info";
import Values from "./Values/Values";
import {getMouseHoverCanvas, getShowInfo} from "../../../../store/selectors/statistic-selectors";
import {useSelector} from "react-redux";
import {getIsLoading, getLanError} from "../../../../store/selectors/app-selector";
import CanvasGraph from "./CanvasGraph";
import CanvasPoint from "./CanvasPoint";

//================== CUSTOM HOOK ==================
const useCanvasAll = () => {
    const classes = useStyles();
    const mouseHoverCanvas = useSelector(getMouseHoverCanvas);
    const showInfo = useSelector(getShowInfo);
    const isLoading = useSelector(getIsLoading);
    const lanError = useSelector(getLanError);

    return {
        classes, lanError, isLoading, showInfo, mouseHoverCanvas
    }
};

//================== COMPONENT ====================
export const CanvasAll: React.FC<{}> = (): ReactElement => {
    const {
        classes, lanError, isLoading, showInfo, mouseHoverCanvas
    } = useCanvasAll();

    return (
        <div className={classes.canvasBlock}>
            <div className={classes.canvasAll}>
                <CanvasAxisMemo/>
                {
                    !lanError &&
                    <>
                        {
                            isLoading
                                ? <Preloader/>
                                : <>
                                    <CanvasGraph/>
                                    {showInfo && mouseHoverCanvas && <CanvasPoint/>}
                                    <Values/>
                                    {showInfo && mouseHoverCanvas && <Info/>}
                                    <Dates/>
                                </>
                        }
                    </>
                }
            </div>
        </div>
    )};
export default CanvasAll;

//========================= STYLE ==================
const useStyles = makeStyles({
    canvasBlock: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 5
    },
    canvasAll: {
        margin: '50px auto 30px',
        position: 'relative',
        width: CANVAS.canvasW(),
        height: CANVAS.canvasH()
    },
});