import React, {ReactElement} from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import {Typography} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import LangSwitcherContainer from "./LangSwitcher/LangSwitcherContainer";
import {HeaderPropsType} from "./HeaderContainer";
import {translate} from "../../helpers/translate";

const Header: React.FC<HeaderPropsType> = (props: HeaderPropsType): ReactElement => {
    const {lang} = props;
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <Typography className={classes.logo}
                        variant='h5'
            >
                Covid
            </Typography>

            <div className={classes.menu}>
                <nav className={style.nav}>
                    <NavLink to='/' className={style.navItem}>
                        {translate(lang, 'Home')}
                    </NavLink>
                    <NavLink to='/summary' className={style.navItem} activeClassName={style.active}>
                        {translate(lang, 'Summary')}
                    </NavLink>
                    <NavLink to='/statistic' className={style.navItem} activeClassName={style.active}>
                        {translate(lang, 'Statistic')}
                    </NavLink>
                </nav>
                <LangSwitcherContainer/>
            </div>


        </header>
    )
};
export default Header;
//====================== STYLES ============================
const useStyles = makeStyles({
    header: {
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: blueGrey[900],
        padding: '0 10px 0 20px',
    },
    logo: {
        color: grey[50],
        textTransform: 'uppercase'
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
    }
});