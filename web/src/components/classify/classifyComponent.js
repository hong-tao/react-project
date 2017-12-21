import React from 'react'
import './classify.scss'

import http from '../../utils/httpClient.js'


class Classify extends React.Component{
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
                            <li><span>品牌</span></li>
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
            </div>
            )
    }
}

//分类
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
    render(){
        return (
            <div>
                <div className='main_lc_r'>
                    <ul>
                        {
                            this.renderUserMessage()
                        }
                    </ul>
                </div>
            </div>
            )
    }
}

export default Classify