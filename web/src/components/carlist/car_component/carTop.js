import React from 'react'
import {Router,Route} from 'react-router'

import './carTop.scss'

class CarTop extends React.Component{
	render(){
		return (
			<div>
				<ul id="CarTop">
					<li>字体图标</li>
					<li>购物车<span>(2)</span></li>
					<li>删除</li>
				</ul>
			</div>
			)
	}
}

export default CarTop;