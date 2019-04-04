import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import UserList from './components/user';
import UserEdit from './components/userEdit';
import reducers from './reducers';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <div>
            <div className="User">
                <UserList/>
                <UserEdit/>
            </div>
        </div>

    </Provider>
    , document.querySelector('.container'));
