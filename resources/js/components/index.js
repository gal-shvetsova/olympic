import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Link, BrowserRouter as Router, withRouter} from 'react-router-dom'

import AppContainer from './components/main'
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


ReactDOM.render(

    <Provider store={createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))}>
        <Router>
            <div>
                <AppContainer/>
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
