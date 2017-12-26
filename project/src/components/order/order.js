import React from 'react'
import {connect} from 'react-redux'
import { Row, Col, Input, Button, message, Popconfirm, Modal, Form, Icon, Spin } from 'antd'
import qs from 'qs'

import * as OrderAction from './orderAction'
import './order.scss'

class OrderList extends React.Component {
	state = {
    	filter: {
    		productName: '商品名称',
    		imgUrl: '主 图',
    		todayPrice: '现 价',
    		username: '用 户 名',
    		number: '商品数量',
    		qty: '库 存',
    		status: '订单状态'
    	}
	}

	// 搜索、加载
	getItem(title) {
		let params = {};
		params.type = 'search';
		if(title){
			params.title = title;
		}
		this.props.getOrder('orderList.php', params);
	}
	
	// 搜索
	search = () => {
		let value = this.props.form.getFieldValue('search');
		if(!value) return;
		this.getItem(value);
	}
	
	// 刷新
	refresh = () => {
		this.getItem();
	}
	
	// 获取obj的键值
	getKeys = (item) => {
		let newObj = item ? JSON.parse(JSON.stringify(item)): {}
	    delete newObj.id;
        return Object.keys(newObj);
    }

	componentDidMount() {
		this.getItem();
	}

    render(){
    	const { getFieldDecorator } = this.props.form;

        return (
        	<div style={{minWith: 600}}>
				<div className="gutter-example">
				    <Row gutter={16} style={{marginRight: 0}}>
				      	<Col className="gutter-row" span={8} offset={4}>
      						<div className="gutter-box">
					          	{
					          		getFieldDecorator('search')(
					          			<Input placeholder="请输入关键字"/>
					          		)
					          	}
      						</div>
				      	</Col>
					  	<Col className="gutter-row" span={4}>
					    	<div className="gutter-box">
						    	<Button type="primary" onClick={this.search}>
						    		搜 索
						    	</Button>
					    	</div>
					  	</Col>
					  	<Col className="gutter-row" span={4}>
					    	<div className="gutter-box">
						    	<Button type="primary" onClick={this.refresh}>
						    		刷新列表
						    	</Button>
					    	</div>
					  	</Col>
				    </Row>
				</div>
				<div style={{overflowX: 'hidden', display: 'flex', paddingTop: 15, flex: 1}}>
					{
						this.props.res[0] ? 
						<table className="table" style={{borderBottom: '1px solid #ccc'}}>
		                    <thead>
		                        <tr>
		                            {
		                                this.getKeys(this.props.res[0]).map((key, index) => {
		                                    return <th key={index}>{this.state.filter[key]}</th>
		                                })
		                            }
		                        </tr>
		                    </thead>
		                    <tbody>
			                    {
			                        this.props.res.map((obj, index) => {
			                            return (
			                                <tr key={'tr' + index}>
			                                    {
			                                        this.getKeys(obj).map((key, idx) => {
			                                        	if(key === 'status'){
															if(obj[key] == 0) {
																return <td key={idx} style={{color: '#108ee9'}}><Icon type="shopping-cart" style={{marginRight: 5}}/>购物车</td>
															}else if(obj[key] == 1) {
																return <td key={idx} style={{color: '#faad14'}}><Icon type="check-circle-o" style={{marginRight: 5}}/>未支付</td>
															}else if(obj[key] == 2) {
																return <td key={idx} style={{color: '#52c41a'}}><Icon type="check-circle-o" style={{marginRight: 5}}/>已支付</td>
															}
			                                        	}
			                                            return <td key={idx}>{obj[key]}</td>
			                                        })
			                                    }
			                                </tr>
			                            )
			                        })
			                    }
			                </tbody>                    
		                    <tfoot></tfoot>
		                </table>
		                :
		                <div style={{
		                	textAlign: 'center', 
		                	marginTop: 20,
		                	fontSize: 18, 
		                	width: '100%',
		                	color: '#ccc', 
		                	fontWeight: 600}}>
		                	NO DATA RETURN
	                	</div>
	                }
				</div>
			</div>
        )
    }
}

const Order = Form.create()(OrderList);

const mapToState = function(state){
    return {
        res: state.order.response || []
    }
}

export default connect(mapToState, OrderAction)(Order);