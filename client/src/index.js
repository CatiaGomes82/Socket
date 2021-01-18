import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { GlobalProvider } from './globalState';
import * as serviceWorker from './serviceWorker';

import './styles/libs/mod-libs/normalise.css';
import './styles/variables.css';
import './styles/global.css';

ReactDOM.render(
    <GlobalProvider>
        <AppRouter />
    </GlobalProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
