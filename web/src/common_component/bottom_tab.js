import React from 'react'
import {Component} from 'react'
import './common_css/bottom_tab.scss'
class Bottom_Tab extends React.Component{
	render(){
		return (
				<div>
					<ul id="bottom_tab">
						<li>
							<span className="iconfont icon-shouye"></span>
							<span>首页</span>
						</li>
						<li>
							<span className="iconfont icon-local"></span>
							<span className="local1">本地</span>
						</li>
						<li>
							<span className="iconfont icon-fenlei"></span>
							<span>分类</span>
						</li>
						<li>
							<span className="iconfont icon-gouwuche1"></span>
							<span>购物车</span>
						</li>
						<li>
							<span className="iconfont icon-WO"></span>
							<span>我</span>
						</li>
					</ul>
				</div>
			)
	}
}

export default Bottom_Tab;