import React from 'react';
import style from './Home.module.css';

const Home = (props) => {
    return (
        <div className={style.home}>
            <div>Интерфейс разработан на базе API: <a href="https://api.covid19api.com">https://api.covid19api.com</a></div>
            <div>с использованием <span>React</span> + <span>Redux</span></div>
            <div>Использованы модули: 'react-router-dom', 'redux', 'react-redux', 'redux-thunk', 'axios'</div>
        </div>
    )
}
export default Home;
