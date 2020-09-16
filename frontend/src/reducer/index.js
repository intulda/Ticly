import { combineReducers } from 'redux';
import member from './member';
import test from './test';

const rootReducer = combineReducers({
    memberReducer: member,
    testReducer: test
});

export default rootReducer;