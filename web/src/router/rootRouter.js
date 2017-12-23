import React from 'react'
import {Router, Route, hashHistory,IndexRoute} from 'react-router'

import AppComponent from '../components/app/appComponent'
import ProductsComponent from '../components/products/productsComponent'
import HomeComponent from '../components/home/homeComponent.js'
import Goodslist from '../components/goodslist/goodslistComponent.js'
import Classify from  '../components/classify/classifyComponent.js'
import DetailView from '../components/detail/detailComponent.js'

export default (
    <Route path="/" component={AppComponent}>
        <IndexRoute component={HomeComponent}/>
        <Route path="products" component={ProductsComponent}></Route>
        <Route path="goodslist" component={Goodslist}></Route>
        <Route path="classify" component={Classify}></Route>
        <Route path='detail' component={DetailView}></Route>
    </Route>
)