import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Home from '../components/home'
import Products from '../components/products/products'
import Login from '../components/login/login'

export default (
	<div>
		<Route path="/" component={Home}>
			<IndexRoute component={Products}/>
	        <Route path="products" component={Products}></Route>
	    </Route>
	    <Route path="/login" component={Login}/>
	</div>
)