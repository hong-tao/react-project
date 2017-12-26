import {createStore, applyMiddleware} from 'redux'
import {ajaxMiddleware} from './ajaxMiddleware'
import reducer from './rootReducer'

const store = createStore(reducer, applyMiddleware(ajaxMiddleware));

export default store;