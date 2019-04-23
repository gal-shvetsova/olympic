import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Link, BrowserRouter as Router, withRouter} from 'react-router-dom'

import StudentList from './components/student';
import OlympiadList from './components/olympiad'
import TaskList from './components/task';
import Login from './components/login';
import AppContainer from './components/main'
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {hasRole} from "./actions/roleActions";


// console.log(store.getState())
ReactDOM.render(

    <Provider store={createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))}>
        <Router>
            <div>
                <AppContainer/>
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
