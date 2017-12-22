import React from 'react'
import { Icon } from 'antd';

import './backtrackComponent.scss'

export default class BacktrackComponent extends React.Component{
    backtrack(){
        window.history.back()
    }
    render(){
        return (
            <div>
                <Icon type='left' onClick={this.backtrack}/>  
            </div>
            )
    }
}





