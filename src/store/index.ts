import * as History from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export const history = History.createBrowserHistory();

const middlewares = [thunk];

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

export default store;
