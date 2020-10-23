import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from './store/store'
import ErrorBoundary from "./components/common/ErrorBoundary";
import {CssBaseline} from "@material-ui/core";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <ErrorBoundary>
                <CssBaseline />
                <App/>
            </ErrorBoundary>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);


