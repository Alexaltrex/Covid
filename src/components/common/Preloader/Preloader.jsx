import React from 'react';
import style from './Preloader.module.css';
import preloader from './../../../assets/preloader/circles.svg'

let Preloader = () => {
    return (
        <div className={style.preloader}>
            <img src={preloader} alt=""/>
        </div>
    )
};

export default Preloader;

