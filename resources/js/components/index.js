import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'

import StudentList from './components/student';
import OlympiadList from './components/olympiad'
import TaskList from './components/task';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

ReactDOM.render(
    <Provider store={createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))}>
        <Router>
            <Link to="/olympiad">Olympiad </Link>
            <Link to="/student">Student</Link>
            <div>
                <Route path="/olympiad" component={OlympiadList}/>
                <Route path="/student" component={StudentList}/>
                <Route path="/task/:id" component={TaskList}/>
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
