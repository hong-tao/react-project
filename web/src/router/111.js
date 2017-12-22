import React from 'react'


export default class AppComponent extends React.Component{
    state={
        html: '<a href="#">这是一段html代码</a><a href="#">2</a><a href="#">3</a>'
    }
    render(){
        return (
            <div>
                <h1 dangerouslySetInnerHTML={{__html:this.state.html}}></h1>
            </div>
            )
    }
}