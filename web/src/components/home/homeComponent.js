import React from 'react'
import {connect} from 'react-redux'

import * as HomeActions from './homeActions.js'
import {hashHistory} from 'react-router'

class HomeComponent extends React.Component{
    myclick(){
        hashHistory.push('products')
    }
    render(){
        return (
            <div>
                <h1>HOMEComponent</h1>
                <input type='button' value='click me' onClick={this.myclick} />
            </div>
            )
    }


}


export default HomeComponent