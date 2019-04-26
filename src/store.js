import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

const middleware = [thunk];

const store = createStore(rootReducer,
    composeWithDevTools(
        /* logger must be the last middleware in chain to log actions */
        applyMiddleware(...middleware)
    ));

export default store;