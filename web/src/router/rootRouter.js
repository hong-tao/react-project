import React from 'react'
import {Router, Route, hashHistory} from 'react-router'
import AppComponent from '../components/app/appComponent'
import ProductsComponent from '../components/products/productsComponent'
import Carlist from '../components/carlist/Cart'



export default (
    <Route path="/" component={AppComponent}>
        <Route path="/products" component={ProductsComponent}></Route>
        <Route path="/carlist" component={Carlist}></Route>
    </Route>
)