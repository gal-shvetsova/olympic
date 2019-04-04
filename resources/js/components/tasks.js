import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import TaskList from './components/task';
import TaskEdit from './components/taskEdit';
import reducers from './reducers';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <div>
            <div className="Task">
                <TaskList/>
                <TaskEdit/>
            </div>
        </div>

    </Provider>
    , document.querySelector('.container'));
