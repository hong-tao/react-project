import React from 'react'
import './car_goods.scss'

class Car_goods extends React.Component{
	state={
		num:1
	}

	add_del(){
		console.log(666);
	}

	render(){
		return(
				<div>
					<div id="car_title">
						<span id="shop_checkbox"></span>
						<span className="iconfont icon-dianpu"></span>
						<span>哈尼哈尼仓储店</span>
						<span>待付款</span>
					</div>
					<div id="car_goods">
						<div id="goods_content">
							<span id="shop_checkbox"></span>
							<img src="./src/assets/imgs/good.jpg"/>
							<div id="good_name">
								<p>澳洲咕噜咕噜Sipahh神奇吸管(5支装)5支</p>
								<p>
									<span>数量：<i>5支装</i></span>
									<span>尺寸：<i>如图</i></span>
									<span id="dele_icon">删除icon</span>
								</p>

								<p id="add_del">￥ <span id="cart_price">价钱</span>
									<span id="add_count">
										<button> - </button>
										<input type="text" value={this.state.num} onChange={this.add_del}/>
										<button> + </button>
									</span>
								</p>
							</div>
						</div>
					</div>
					<h3>已经到最后</h3>
				</div>
			)
	}
}
export default Car_goods;