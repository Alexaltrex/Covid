import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                Covid
            </div>
            <nav className={style.nav}>
                <NavLink to='/' className={style.navItem}>Home</NavLink>
                <NavLink to='/summary' className={style.navItem} activeClassName={style.active}>Summary</NavLink>
                <NavLink to='/statistic' className={style.navItem} activeClassName={style.active}>Statistic</NavLink>
            </nav>
        </header>
    )
};

export default Header;