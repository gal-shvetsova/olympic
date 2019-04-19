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


// console.log(store.getState())
ReactDOM.render(

    <Provider store={createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))}>
        <Router>
            <Link to="/olympiad">Olympiad </Link>
            <Link to="/student">Student</Link>
            <div>
                <AppContainer/>
                <Route path="/olympiad" component={OlympiadList}/>
                <Route path="/student" component={StudentList}/>
                <Route path="/task/:id" component={TaskList}/>

            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
