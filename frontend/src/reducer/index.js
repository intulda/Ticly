import { combineReducers } from 'redux';
import member from './member';
import article from  './article';

const rootReducer = combineReducers({
    memberReducer: member,
    articleReducer: article
});

export default rootReducer;