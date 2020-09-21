import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer  from './store/reducers/auth';
import createSagaMiddleware from 'redux-saga'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import { watchAuth, watchBurger, watchOrder } from './store/sagas/index';


const rootReducer = combineReducers({
	order: orderReducer,
	burgerBuilder: burgerBuilderReducer,
	auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhanchers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null || compose;
const store = createStore(rootReducer, composeEnhanchers(
	applyMiddleware(thunk, sagaMiddleware)
	));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurger);
sagaMiddleware.run(watchOrder);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
