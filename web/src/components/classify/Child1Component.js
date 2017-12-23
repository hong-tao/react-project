import React from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import * as classifyActions from './classifyAction.js'

import './classify.scss'
import http from '../../utils/httpClient.js'
import https from '../../utils/httpServer.js'


class Child1Component extends React.Component{
    componentDidMount(){
        http.get(this.props.api).then(res=>{
            this.setState({dataset:res})
        })
    }
    renderUserMessage(){
        var list = [];
        if(this.state.dataset.length){
            var params = this.state.dataset
            params.forEach(function(item){
                if(list.indexOf(item.aclass)<0){
                    list.push(item.aclass)
                }
            })
        }
        if(list.length){
            var html = list.map(function(item,index){
                return <li key={index}>{item}</li>
            })
            return html      
        }
    }
    state={
        dataset:'',
        
    }
    
    click_query(eve){
        this.props.getData(this.props.api,{params:eve.target.innerHTML})
    }

    parameter(e){
        var id = e.target.parentNode.getAttribute('id')
        this.props.getParams(id)
        hashHistory.push('detail')
    }

    list_1(){
        var params = this.props.params;
        if(params){
            var html = params.map((item,index)=>{
                return <li id={item.id} key={item+index}><img src={'./src/img/'+item.imgUrl} /><span>{item.detailclass}</span></li>
            })
        }
        return html
    }
    render(){
        
        return (
            <div>
                <div className='main_lc_r'>
                    <ul onClick={this.click_query.bind(this)}>
                        {
                            this.renderUserMessage()
                        }
                    </ul>
                </div>
                <div className='main_lc_l'>
                    <ul onClick={this.parameter.bind(this)}>
                        {
                          this.list_1()
                        }
                    </ul>
                </div>
            </div>
            )
    }
}

const mapTostate = function(state){
    return {
        params:state.aa.response

    }
}

export default connect(mapTostate,classifyActions)(Child1Component)