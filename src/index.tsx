import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter, Route} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from './store/store'
import ErrorBoundary from "./components/common/ErrorBoundary";
import {CssBaseline} from "@material-ui/core";
import {QueryParamProvider} from "use-query-params";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <QueryParamProvider ReactRouterRoute={Route}>
                <ErrorBoundary>
                    <CssBaseline/>
                    <App/>
                </ErrorBoundary>
            </QueryParamProvider>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);


