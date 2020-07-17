import React from 'react';
import style from './App.module.css';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

const App = () => {
    return (
        <div className={style.appWrapper}>
            <Header/>
            <Main/>
        </div>
    )
};

export default App;