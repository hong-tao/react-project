import React from 'react'
import {connect} from 'react-redux'
import { Row, Col, Input, Button, message, Popconfirm, Modal, Form, Select } from 'antd'
import qs from 'qs'

import * as GoodsAction from './goodsAction'
import http from '../../../utils/ajax'
import './goods.scss'

const FormItem = Form.Item;
const Option = Select.Option;

class GoodsList extends React.Component {
	state = {
		rowItem: {},
		ids: '',
		changeId: '',
    	visible: false,
    	checkAll: false,
    	editType: true,
    	filter: {
    		productName: '商品名称',
    		aclass: '主分类',
    		brand: '子分类',
    		logo: 'logo',
    		hot: '热门',
    		describle: '详情图片',
    		originPrice: '原价',
    		todayPrice: '现价',
    		imgUrl: '主图',
    		qty: '库存',
    		postage: '邮费',
    		detailclass: '详情分类',
    		state: ''
    	}
	}

	// 搜索、加载
	getItem(title) {
		let params = {};
		params.type = this.props.routePath === 'shelve' ? 'upSearch' : 'downSearch';
		if(title){
			params.title = title;
		}
		this.props.getGoods('goodsList.php', params);
		let list = document.querySelector('#list');
		if(list){
			let checkList = list.querySelectorAll("input[type='checkbox']");
			for(let i=0; i<checkList.length; i++){
				checkList[i].checked = false;
			}
		}
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
	    delete newObj.state;
        return Object.keys(newObj);
    }
	
	// 单条删除
	del = (e) => {
		let id = e.target.getAttribute('data-id');
		this.setState({changeId: id});
	}

    delConfirm = (e) => {
    	let params = { id: this.state.changeId, type: 'del' };
		http.post('goodsList.php', qs.stringify(params)).then(res =>{
			if(!Boolean(res.data)) {
				message.error('删除失败');
			}else {
				message.success('删除成功');
			}
			this.getItem();
		}).catch(error => {});
    }
	
	// 单条上下架
    shelve = (e) => {
		let id = e.target.getAttribute('data-id');
		this.setState({changeId: id});
    }
	
    shelveConfirm = () => {
		let params = { id: this.state.changeId };
		params.type = this.props.routePath === 'shelve' ? 'unShelve' : 'shelve';
		http.post('goodsList.php', qs.stringify(params)).then(res =>{
			if(res.data == true) {
				this.props.routePath === 'shelve' ? 
				message.success('下架成功') : 
				message.success('上架成功');
			}else {
				this.props.routePath === 'shelve' ? 
				message.success('下架失败') : 
				message.success('上架失败');
			}
			this.getItem();
		}).catch(error => {});
    }
	
	// 编辑
	edit = (e) => {
		this.props.form.resetFields()
		let id = e.target.getAttribute('data-id');
		let index = e.target.getAttribute('data-idx');
		this.setState({ 
			rowItem: this.props.dataset[index], 
			changeId: id, 
			visible: true,
			editType: true
		});
	}

	add = () => {
		this.props.form.resetFields()
		this.setState({ 
			visible: true,
			editType: false
		});
	}
	
	editYes = () => {

		let datas = {};
		let params = {};
		this.props.form.validateFields((err, values) => {
			if (!err) {
				for(let key in this.state.filter){
					datas[key] = this.props.form.getFieldValue(key);
				}
			}
		});

		if(datas.hot === '是'){
			datas.hot = 'y';
		}else {
			datas.hot = 'n';
		}
		if(datas.state === '上架'){
			datas.state = 'up';
		}else {
			datas.state = 'down';
		}
		if(this.state.editType) {
			params.type = 'edit';
			params.id = this.state.changeId;
		}else {
			params.type = 'add';
		}
		params.datas = JSON.stringify(datas);

		http.post('goodsList.php', qs.stringify(params)).then(res => {
			if(Boolean(res.data)) {
				if(params.type === 'edit')
				params.type === 'edit' ? 
				message.success('编辑成功') : 
				message.success('添加成功');
			}else {
				params.type === 'edit' ? 
				message.success('编辑失败') : 
				message.success('添加失败');
			}
			this.getItem();
			this.setState({ visible: false });
		});
	}

	editNo = () => {
		this.setState({ visible: false });
	}

	checkAll = (e) => {
		let checked = e.target.checked;
		let list = document.querySelector('#list');
		let checkList = list.querySelectorAll("input[type='checkbox']");
		for(let i=0; i<checkList.length; i++){
			checkList[i].checked = checked;
		}
	}
	
	isCheckAll = () => {
		let list = document.querySelector('#list');
		let checkAll = document.querySelector('#checkAll');
		let checkList = list.querySelectorAll("input[type='checkbox']");
		for(let i=0; i<checkList.length; i++){
			if(!checkList[i].checked){
				checkAll.checked = false;
				return;
			}
		}
		checkAll.checked = true;
	}

	// 批量选择
	sels = () => {
		let list = document.querySelector('#list');
		let checkList = list.querySelectorAll("input[type='checkbox']");
		let sels = [];
		for(let i=0; i<checkList.length; i++){
			if(checkList[i].checked){
				sels.push(checkList[i].getAttribute('data-ids'));
			}
		}
		return sels.join();
	}

	// 批量删除
	dels = () => {
		if(!this.sels()) {
    		return;
    	}
    	this.setState({ids: this.sels()});
	}

    delsConfirm = () => {
		let params = { ids: this.state.ids, type: 'dels' }
		http.post('goodsList.php', qs.stringify(params)).then(res =>{
			if(Boolean(res[0])){
				message.success('批量删除成功');
			}else {
				message.error('批量删除成功');
			}
			this.getItem();
		}).catch(error => {});
    }

	// 批量上下架
    shelves = () => {
    	if(!this.sels()[0]) {
    		return;
    	}
    	this.setState({ ids: this.sels() });
    }
	
    shelvesConfirm = () => {
    	let params = { ids: this.state.ids };
		params.type = this.props.routePath === 'shelve' ? 'unShelves' : 'shelves';
		http.post('goodsList.php', qs.stringify(params)).then(res => {
			if(Boolean(res.data[0])) {
				this.props.routePath === 'shelve' ? 
				message.success('下架成功') : 
				message.success('上架成功');
			}else {
				this.props.routePath === 'shelve' ? 
				message.success('下架失败') : 
				message.success('上架失败');
			}
			this.getItem();
		}).catch(error => {});
    }

	componentDidMount() {
		this.getItem();
	}

    render(){
    	const formItem = {
    		labelCol: { span: 6 },
    		wrapperCol: { span: 14 }
    	};

    	const { getFieldDecorator } = this.props.form;

        return (
        	<div style={{minWith: 600}}>
				<div className="gutter-example">
				    <Row gutter={16} style={{marginRight: 0}}>
				      	<Col className="gutter-row" span={4}>
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
				      	<Col className="gutter-row" span={4}>
				        	<div className="gutter-box">
					        	<Button type="primary" onClick={this.add}>
					        		添加商品
					        	</Button>
				        	</div>
				      	</Col>
				      	<Col className="gutter-row" span={4}>
				        	<div className="gutter-box">
				        		<Popconfirm title={this.props.routePath === 'shelve' ? 
					        		"你确定下架选中的商品吗？" : 
					        		"你确定上架选中的商品吗？"} 
					        		onConfirm={this.shelvesConfirm} 
					        		okText="确 定" 
					        		cancelText="取 消">
				                    <Button type="primary" 
					                    style={{margin: '0 8px'}} 
					                    onClick={this.shelves}>
					                    {this.props.routePath === 'shelve' ? "批量下架" : "批量上架"}
				                    </Button>
								</Popconfirm>
				        	</div>
				      	</Col>
				      	<Col className="gutter-row" span={4}>
				        	<div className="gutter-box">
				        		<Popconfirm title="你确定删除选中的商品吗？" 
						        		onConfirm={this.delsConfirm} 
						        		okText="确 定" 
						        		cancelText="取 消">
					                    <Button type="primary" 
					                    style={{margin: '0 8px'}} 
					                    onClick={this.dels}>
					                    批量删除
				                    </Button>
								</Popconfirm>
				        	</div>
				      	</Col>
				    </Row>
				</div>
			    <div style={{overflowX: 'hidden', display: 'flex', paddingTop: 15, flex: 1}}>
		            {
	                    this.props.dataset[0] ?  
						<table className="table" style={{borderBottom: '1px solid #ccc'}}>
		                    <thead>
	                        	<tr style={{borderBottom: '1px solid #bcbcbc'}}>
		                        	<th style={{width: 50}}>
		                        		<input onClick={this.checkAll} type="checkbox" id="checkAll"/>
		                        	</th>
		                            {
		                                this.getKeys(this.props.dataset[0]).map((key, index) => {
		                                    return <th key={index}>{this.state.filter[key]}</th>
		                                })
		                            }
		                            <th key="control" style={{textAlign: 'center'}}>操作</th>
		                        </tr>
		                    </thead>
			                <tbody id="list" style={{borderTop: '1px solid '}}>
			                    {
			                        this.props.dataset.map((obj, index) => {
			                            return (
			                                <tr key={'tr' + index}>
			                                	<td style={{width: 50}} key="check" >
			                                		<input type="checkbox" 
				                                		onClick={this.isCheckAll} 
				                                		data-ids={this.props.dataset[index].id}/>
			                                	</td>
			                                    {
			                                        this.getKeys(obj).map((key, idx) => {
			                                            return <td key={idx}>{obj[key]}</td>
			                                        })
			                                    }
			                                    <td key="ctrl" style={{textAlign: 'center'}}>
			                                    	<Popconfirm title="你确定删除该商品吗？" 
				                                    	onConfirm={this.delConfirm} 
				                                    	okText="确 定" 
				                                    	cancelText="取 消">
			                                    		<Button type="primary" 
				                                    		style={{margin: '0 8px'}} 
				                                    		data-id={this.props.dataset[index].id}
				                                    		onClick={this.del}>
			                                    			删 除
			                                    		</Button>
													</Popconfirm>
													<Popconfirm title="你确定下架该商品吗？" 
														onConfirm={this.shelveConfirm} 
														okText="确 定" 
														cancelText="取 消">
			                                    		<Button type="primary" 
				                                    		style={{margin: '0 8px'}} 
				                                    		data-id={this.props.dataset[index].id} 
				                                    		onClick={this.shelve}>
				                                    		{this.props.routePath === 'shelve' ? "下 架" : "上 架"}
			                                    		</Button>
													</Popconfirm>
			                                    	<Button type="primary" 
				                                    	style={{margin: '0 8px'}} 
				                                    	data-idx={index} 
				                                    	data-id={this.props.dataset[index].id} 
				                                    	onClick={this.edit}>
				                                    	编 辑
			                                    	</Button>
			                                    </td>
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
			    <Modal closable={false} 
				    maskClosable={false} 
				    visible={this.state.visible} 
				    title="商 品 编 辑" 
				    onOk={this.editYes} 
				    onCancel={this.editNo}
				    footer={[
				    	<Button key="editNo" 
					    	type="primary" 
					    	onClick={this.editNo}>
					    	取 消
				    	</Button>,
				    	<Button key="editYes" 
					    	type="primary" 
					    	onClick={this.editYes}>
					    	保 存
				    	</Button>,
				    ]}>
			        <Form layout="horizontal">
					    {
							this.state.visible ? 
							(
								this.state.editType ?
								this.getKeys(this.state.rowItem).map((key, idx) => {
									return (
										<FormItem label={this.state.filter[key]} { ...formItem } key={idx}>
								          	{
								          		getFieldDecorator( key, {
									          		rules: [
										              	{ 
										              		required: true, 
										              		message: key == 'price' ? 
										              		'请输入数字且不能为空' :
										              		'请输入' + this.state.filter[key]
										              	}
										            ],
										            initialValue: key === 'hot' ? 
											            (this.state.rowItem.hot === 'y' ? '是' : '否') : 
											            this.state.rowItem[key],
										            ref: key
									          	})(
									          		key === 'hot' ? 
									          		<Select>
												        <Option value="是">是</Option>
												        <Option value="否">否</Option>
										        	</Select>
									          		:
									          		<Input placeholder={'请输入 ' + this.state.filter[key]}/>
									          	)
								          	}
								        </FormItem>
									)
								})
								:
								this.getKeys(this.state.filter).map((key, idx) => {
									return (
										<FormItem label={this.state.filter[key]} { ...formItem } key={idx}>
								          	{
								          		getFieldDecorator( key, {
									          		rules: [
										              	{ 
										              		required: true, 
										              		message: key === 'price' ? 
										              		'请输入数字且不能为空' : 
										              		'请输入' + this.state.filter[key]
										              	}
										            ],
										            initialValue: key === 'hot' ? '是' : ''
									          	})(
													key === 'hot' ? 
									          		<Select>
												        <Option value="是">是</Option>
												        <Option value="否">否</Option>
										        	</Select>
									          		:
									          		<Input placeholder={'请输入' + this.state.filter[key]}/>
									          	)
								          	}
								        </FormItem>
									)
								})
							)
							: ''
	                    }
						{
					        this.state.visible ? 
					        <FormItem label="商品状态" labelCol={{ span: 6 }} wrapperCol={{ span: 4 }}>
						        {
						        	getFieldDecorator('state', {
							        	rules: [{ required: true }],
							        	initialValue: this.props.routePath === 'shelve' ? '上架' : '下架'
							        })(
								        <Select>
									        <Option value="上架">上架</Option>
									        <Option value="下架">下架</Option>
							        	</Select>
							        )
							    }
					        </FormItem>
					        : ''
						}
			        </Form>
			    </Modal>
  			</div>
        )
    }
}

const Goods = Form.create()(GoodsList);

const mapToState = function(state){
    return {
    	routePath: state.home.routePath || 'shelve',
        dataset: state.goods.response || []
    }
}

export default connect(mapToState, GoodsAction)(Goods);