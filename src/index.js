/* REACT IMPORTS */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/index';
import * as serviceWorker from './serviceWorker';

/* RENDER APP */
ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
