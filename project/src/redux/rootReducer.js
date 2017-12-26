import {combineReducers} from 'redux'

import goods from '../components/common/goods/goodsReducer'
import home from '../components/home/homeReducer'
import order from '../components/order/orderReducer'

export default combineReducers({
    home, goods, order
})