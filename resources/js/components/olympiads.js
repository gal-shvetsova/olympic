import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import OlympiadList from './components/olympiad';
import OlympiadEdit from './components/olympiadEdit';
import reducers from './reducers';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <div>
            <div className="Olympiad">
                <OlympiadList/>
                <OlympiadEdit/>
            </div>
        </div>

    </Provider>
    , document.querySelector('.container'));
