import React from 'react'
import {connect} from 'react-redux'
import { Icon } from 'antd';

import './backtrackComponent.scss'

import * as backtrackActions from './backtrackAction.js'

class BacktrackComponent extends React.Component{
    
    render(){
        return (
            <div>
                <Icon type='left' onClick={this.props.backtrack}/>  
            </div>
            )
    }
}

var RouterSet = function(state){
  console.log(state)
  return {
    routerSet:[]
  }
}

export default connect(RouterSet,backtrackActions)(BacktrackComponent);




