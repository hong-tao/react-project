import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import Home from '../components/home/home'
import Login from '../components/login/login'
import NotFound from '../components/notFound/notFound'

import Shelve from '../components/products/shelve'
import UnShelve from '../components/products/unShelve'
import Order from '../components/order/order'

export default (
	<div>
		<Route path="/" component={Home}>
			<IndexRoute component={Shelve}/>
	        <Route path="shelve" component={Shelve}></Route>
	        <Route path="unShelve" component={UnShelve}></Route>
	        <Route path="order" component={Order}></Route>
	    </Route>
	    <Route path="/login" component={Login}/>
	    <Route path="/404page" component={NotFound}/>
	    <Route path="*" component={NotFound}/>
	</div>
)