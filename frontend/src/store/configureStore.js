import {applyMiddleware, createStore, compose} from "redux";
import { composeWithDevTools } from "redux-devtools-extension/index";
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducer';
import rootSaga from '../sagas';

const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if(action === 'function') {
        return action(dispatch, getState)
    }
    return next(action);
};

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, loggerMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(rootReducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};