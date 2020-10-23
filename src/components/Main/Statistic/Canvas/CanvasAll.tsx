import {CanvasPropsType} from "./CanvasContainer";
import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CANVAS} from "../../../../helpers/canvas";
import InfoContainer from "./Info/InfoContainer";
import CanvasPointContainer from "./CanvasPointContainer";
import CanvasAxisMemo from "./CanvasAxis";
import CanvasGraphContainer from "./CanvasGraphContainer";
import ValuesContainer from "./Values/ValuesContainer";
import DatesContainer from "./Dates/DatesContainer";
import Preloader from "../../../common/Preloader";

export const CanvasAll: React.FC<CanvasPropsType> = (props: CanvasPropsType): ReactElement => {
    const {valuesCurrent, mouseHoverCanvas, showInfo, isLoading} = props;
    const classes = useStyles();
    let valueIsExists = !!valuesCurrent.length;

    return (
        <div className={classes.canvasBlock}>
            <div className={classes.canvasAll}>
                <CanvasAxisMemo/>
                {
                    isLoading || !valueIsExists
                        ? <Preloader/>
                        : <>
                            <CanvasGraphContainer/>
                            {showInfo && mouseHoverCanvas && <CanvasPointContainer/>}
                            <ValuesContainer />
                            {showInfo && mouseHoverCanvas && <InfoContainer/>}
                            <DatesContainer />
                        </>
                }
            </div>

        </div>
    )
};
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