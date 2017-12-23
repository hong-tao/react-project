import React from 'react'
import Backtrack from '../../common_component/backtrack/backtrackComponent.js'
import {connect} from 'react-redux'

import * as DetailActions from './detailAction.js'
import {Icon,Badge} from 'antd'
import { Carousel } from 'antd';

import './detailComponent.scss'

class DetailComponent extends React.Component{
    state = {
        count: 3,
        show: true,
    }
    componentDidMount(){
        var path = 'detail.php'
        this.props.getDateset(path,{id:this.props.id})
    }

    myCarousel(){
        var product = this.props.dataParams
        if(product!=undefined){
            if(product.length){
                var imgurl = product[0].describle.split(',')
                var html =imgurl.map((item,index)=>{
                    return <div key={item+index}><img src={"./src/img/"+item} /></div>
                })
            }
            
        }
        return html
    }

    myPrice(){
        var product = this.props.dataParams
        if(product!=undefined){
            if(product.length){
                console.log(product)
                var text = product.map((item)=>{
                    return `<p>${item.productName}</p>
                            <div>
                                <span>￥${item.todayPrice}</span>
                                <span>V1专享价</span>
                                <span>淘宝价：￥${item.originPrice}</span>
                            </div>
                            <p>商品售价：￥${item.originPrice}</p>
                    `
                })
            }
        }
        var html = {__html:text}
        return <div dangerouslySetInnerHTML={html}></div>
    }
    onChange(a,b,c){
    }
    render(){
        return (
            <div className='detail_all'>
                <div className='detail_header'>
                    <Backtrack />
                    <span>商品详情</span>
                    <Icon type="select" />
                </div>
                <div className='detail_main' >
                    <div className='d_Carousel'>
                        <Carousel afterChange={this.onChange}>
                            {
                                this.myCarousel()
                            }
                        </Carousel>
                    </div>
                    <div className='d_details'>
                        {
                            this.myPrice()
                        }
                    </div>
                    <div className='safeguard'>
                        <ul>
                            <li><i style={{color:'#FED190'}} className='iconfont icon-zhengpin'></i><span style={{color:'#FED190'}}>正品保障</span></li>
                            <li><i style={{color:'#67DAA3'}} className='iconfont icon-pinpaishouquan'></i><span style={{color:'#67DAA3'}}>品牌授权</span></li>
                            <li><i style={{color:'#86D0FD'}} className='iconfont icon-icon'></i><span style={{color:'#86D0FD'}}>闪电发货</span></li>
                            <li><i style={{color:'#EE8A70'}} className='iconfont icon-peifu'></i><span style={{color:'#EE8A70'}}>理赔承担</span></li>
                        </ul>
                    </div>
                    <div className='introduction'>
                        <p><span>图片详情</span></p>
                        {
                            this.myCarousel()
                        }
                    </div>
                </div>
                <div className='detail_footer' >
                    <ul>
                        <li>
                            <Badge count={this.state.count}>
                                <Icon type="shopping-cart" />
                            </Badge>
                        </li>
                        <li><span>立即购买</span></li>
                        <li><span>加入购物车</span></li>
                    </ul>
                </div>
            </div>
            )
    }
}

const mapTostate = function(state){
    return {
        id:state.aa.id,
        dataParams:state.detail.response
    }
}

export default connect(mapTostate,DetailActions)(DetailComponent)