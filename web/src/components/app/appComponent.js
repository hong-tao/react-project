import React from 'react'
import {Link} from 'react-router'
export default class AppComponent extends React.Component{
    render(){
        return (
            <div>
                <div>{this.props.children}</div>
            </div>
        )
    }
}