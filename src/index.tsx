import React from 'react';
import ReactDOM from 'react-dom';
import AppWithRedux from "./AppWithRedux";

import * as serviceWorker from './serviceWorker';
import './index.css';
import {ErrorBoundary} from './ErrorBoundary';
import {store} from "./state/store";
import App from "./App";
import {Provider} from "react-redux";



ReactDOM.render(
    //@ts-ignore
    <ErrorBoundary>
        <Provider store={store}>
            <AppWithRedux/>
            {/*{console.log('hi')}*/}
        </Provider>
        <App/>
    </ErrorBoundary>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
