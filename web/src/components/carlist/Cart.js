import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory} from 'react-router'

import CarTop from './car_component/carTop'
import Cargoods from './car_component/car_goods'




class Cart extends React.Component{
	state={
		num:1
	}

	add_del(){
		console.log(666);
	}

	render(){
		return(
			<div>
				<div id="Cartbox">
					<CarTop/>
					<Cargoods/>
				</div>
			</div>
			)
	}
}

export default Cart;