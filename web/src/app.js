import React from 'react'
import ReactDOM from 'react-dom'
import { form, notification } from 'antd'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'

import store from './redux/configStore.js'
import BacktrackComponent from './components/backtrack/backtrackComponent.js'
import routes from './router/rootRouter.js'

import 'antd/dist/antd.css';


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}/> 
    </Provider>
    ,document.getElementById('app'))