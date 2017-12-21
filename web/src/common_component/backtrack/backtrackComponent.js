import React from 'react'
import { Icon } from 'antd';


export default class BacktrackComponent extends React.Component{
    backtrack(){
        window.history.back()
    }
    render(){
        return (
                <Icon type='left' onClick={this.backtrack}/>  
            )
    }
}






