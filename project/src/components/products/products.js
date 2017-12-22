import React from 'react'
import {connect} from 'react-redux'
import { Row, Col, Input, Button } from 'antd'
import './products.scss'
import * as ProductsAction from './productsAction'

class Products extends React.Component{
	state = {
		searchItem: ''
	}

	search(){
		this.setState({ searchItem: this.refs.searchItem.value})
	}
	
	getKeys(item){
        var newObj = (item ? Object.keys(item) : []);
        return newObj
    }

	componentDidMount(){
		var a = JSON.parse("[{"name": "jkdf"}]");
		console.log(a)
		let params = new URLSearchParams();
        params.append('type', 'search');
        console.log(params)
		this.props.getData('hotel.php', params);
	}

    render(){
        return (
			<div className="gutter-example">
			    <Row gutter={16}>
			      	<Col className="gutter-row" span={12}>
			        	<div className="gutter-box">
				        	<Row gutter={16}>
						      	<Col className="gutter-row" span={16}>
						        	<div className="gutter-box"><Input placeholder="请输入关键字" value={this.state.searchItem}/></div>
						      	</Col>
						      	<Col className="gutter-row" span={8}>
						        	<div className="gutter-box"><Button type="primary" onClick={this.search.bind(this)}>搜 索</Button></div>
						      	</Col>
						    </Row>
					    </div>
			      	</Col>
			      	<Col className="gutter-row" span={4}>
			        	<div className="gutter-box"><Button type="primary">刷新列表</Button></div>
			      	</Col>
			      	<Col className="gutter-row" span={4}>
			        	<div className="gutter-box"><Button type="primary">批量上架</Button></div>
			      	</Col>
			      	<Col className="gutter-row" span={4}>
			        	<div className="gutter-box"><Button type="primary">批量删除</Button></div>
			      	</Col>
			    </Row>

			    <table>
			    	<thead>
			    		<tr>
			    			{
								this.getKeys(this.props.dataset[0]).map(function(key, index){
                                    return <th key={index}>{key}</th>
                                })
			    			}
			    		</tr>
			    	</thead>
			    	<tbody>
			    		{
			    			this.props.dataset.map(function(obj, index){
	                            return (
	                                <tr key={'tr' + index}>
	                                    {
	                                        this.getKeys(obj).map(function(key, idx){
	                                            if(typeof obj[key] != 'object'){
	                                                return <td key={'b' + idx}>{obj[key]}</td>
	                                            } 
	                                            return <td key={'a' + idx}>object</td>
	                                        })
	                                    }
	                                </tr>
	                            )
	                        }.bind(this))
			    		}
			    	</tbody>
			    </table>
  			</div>
        )
    }
}

const mapToState = function(state){
	
    return {
        dataset: state.products.response || []
    }
}

export default connect(mapToState, ProductsAction)(Products);