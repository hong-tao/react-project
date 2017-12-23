import React from 'react'
import {connect} from 'react-redux'

import * as classifyActions from './classifyAction.js'
import Child1Component from './Child1Component.js'

import './classify.scss'

import http from '../../utils/httpClient.js'
import Bottoms from '../../common_component/bottom_tab.js'
import https from '../../utils/httpServer.js'

class ClassifyComponent extends React.Component{
    state={
        status:1
    }
    myclick_c1(event){
        var text = event.target.innerHTML;
        if(text=='分类'){
            this.setState({status:1})

        }else if(text==='品牌'){
            this.setState({status:2})
        }
    }
    render(){
        return (
            <div>
                <div className='header'>
                    <div className='header_hc'>
                        <input type='text' />
                    </div>
                    <div className='header_bc'>
                        <ul onClick={this.myclick_c1.bind(this)}>
                            <li><span>分类</span></li>
                        </ul>
                    </div>
                </div>
                <div className='main'>
                    {
                        this.state.status==1 && <Child1Component api='http://localhost:1133/goodslist.php'/>
                    }
                    {
                        this.state.status==2 && <h1>child2</h1>
                    }
                </div>
                <div className='footer'>
                    <Bottoms />
                </div>
            </div>
            )
    }
}




export default ClassifyComponent