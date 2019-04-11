import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'

import UserList from './components/user';
import OlympiadList from './components/olympiad'
import TaskList from './components/task';
import reducers from './reducers';
import App from './components/app';


ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <Router>
            <Link to="/olympiad">Olympiad </Link>
            <Link to="/user">User</Link>
            <div>
                <Route path="/olympiad" component={OlympiadList}/>
                <Route path="/user" component={UserList}/>
                <Route path="/task/:id" component={TaskList}/>
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
