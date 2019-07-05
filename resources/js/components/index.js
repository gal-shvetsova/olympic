import React from 'react';
import ReactDOM  from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'

import AppContainer from './components/main'
import reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


ReactDOM.render(
    <Provider store={createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))}>
        <Router>
            <AppContainer/>
        </Router>
    </Provider>
    , document.getElementById('root'));
