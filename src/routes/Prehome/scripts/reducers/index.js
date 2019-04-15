
import { combineReducers } from 'redux';
import news from './news_reducer';

const rootReducer = combineReducers({
    news
})

export default rootReducer;