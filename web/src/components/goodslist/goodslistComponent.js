import React from 'react'
import {Icon} from 'antd'
import Backtrack from '../../common_component/backtrack/backtrackComponent.js'

import './goodslist.scss'

class GoodslistComponent extends React.Component{
    render(){
        return (
            <div>
                <div className="header">
                    <div className='header_h'>
                        <Backtrack></Backtrack>
                        <span>奶瓶/餐具</span>
                        <Icon type="shopping-cart" />
                    </div>
                    <div className='header_b'>
                        <ul>
                            <li><span>人气</span></li>
                            <li><span>最新</span></li>
                            <li><span>价格</span></li>
                            <li><span>筛选</span></li>
                        </ul>
                    </div>
                </div>

            </div>
            )
    }
}

export default GoodslistComponent