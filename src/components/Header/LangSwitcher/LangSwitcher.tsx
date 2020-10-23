import {FormControlLabel} from "@material-ui/core";
import React from "react";
import Switch from "@material-ui/core/Switch";
import {LangSwitcherPropsType} from "./LangSwitcherContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";

const LangSwitcher: React.FC<LangSwitcherPropsType> = (props: LangSwitcherPropsType) => {
    const {lang, setLang} = props;
    const classes = useStyles();
    const checked = lang === 'eng'
    const handleChange = () => {
        if (lang === 'eng') {
            setLang('rus')
        } else {
            setLang('eng')
        }
    };
    const label = lang === 'eng' ? 'ENG' : 'RUS';
    return (
        <div className={classes.wrapper}>
            <FormControlLabel
                control={
                    <Switch checked={checked}
                            onChange={handleChange}
                            name="checkedA"
                            classes={{
                                root: classes.root,
                                track: classes.track,
                            }}
                    />
                }
                label={label}
                className={classes.label}
            />
        </div>
    )
};
export default LangSwitcher

//====================== STYLES ============================
const useStyles = makeStyles({
    root: {
       color: 'white'
    },
    label: {
        color: 'white',
        //width: 32
    },
    wrapper: {
        width: 100,
        marginLeft: 10
    },
    track: {
       backgroundColor: grey[200],
    }
});

