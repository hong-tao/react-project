import {combineReducers} from 'redux'

import aa from '../components/classify/classifyReducers.js'
import detail from '../components/detail/detailReducer.js'

export default combineReducers({
    aa,
    detail
})

