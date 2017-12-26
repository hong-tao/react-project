import React from 'react'
import { Router, Route, hashHistory, Link } from 'react-router'
import { Menu, Breadcrumb, Icon, Layout, Modal, Button, Dropdown, Avatar, Popconfirm } from 'antd';
import { connect } from 'react-redux'

import style from './home.scss'
import * as HomeAction from './homeAction'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;

class Home extends React.Component {
  state = {
    mode: 'inline',
    token: true,
    user: '',
    openKeys: ['sub1'],
    current: '',
    rootSubmenuKeys: ['sub1', 'sub2', 'sub3']
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  
  shelve = () => {
    this.props.shelveGoods('shelve');
  }

  unShelve = () => {
    this.props.shelveGoods('unShelve');
  }

  btnLogout = () => {
    hashHistory.push('login');
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  getRoute = () => {
    let path = hashHistory.getCurrentLocation().pathname;
    let sub =  [];
    let key;
    if(path === '/shelve' || '/'){
      sub = ['sub1'];
      key = '1';
    }
    if(path === '/unShelve'){
      sub = ['sub1'];
      key = '2';
    }
    if(path === '/order'){
      sub = ['sub2'];
      key = '3';
    }
    this.setState({ current: key, openKeys: sub });
  }

  componentWillMount() {
    let token = sessionStorage.getItem('token') || localStorage.getItem('token');
    this.setState({user: token});
    if(!token){
      this.setState({token: false});
      Modal.warning({
        title: '登录信息不存在，请重新登录！',
        okText: '确认',
        onOk(){
          hashHistory.push('login');
        }
      });
    }
    this.getRoute();
  }

  render() {
    if(this.state.token) {
      return (
        <Layout>
          <Sider>
            <div className="logo">哈尼哈尼后台管理系统</div>
            <Menu mode="inline"
              openKeys={this.state.openKeys}
              selectedKeys={[this.state.current]}
              onClick={this.handleClick}
              onOpenChange={this.onOpenChange}
              style={{ width: 200, height: '100%',paddingTop: 64 }}>
              <SubMenu key="sub1" title={<span><Icon type="file" /><span>商品信息</span></span>}>
                <Menu.Item key="1">
                  <Link to="shelve" onClick={this.shelve}>上架商品</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="unShelve" onClick={this.unShelve}>下架商品</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="profile" /><span>订单信息</span></span>}>
                <Menu.Item key="3">
                  <Link to="order">订单查询</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="setting" /><span>后台设置</span></span>}>
                <Menu.Item key="4">
                  <Link>个人设置</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link>系统设置</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#1890ff', padding: 0, position: 'relative' }}>
              <Dropdown 
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Popconfirm placement="bottom" title="你确定退出登录吗？" onConfirm={this.btnLogout} okText="确 认" cancelText="取 消">
                        <a href="javascript: void(0);">退出登录</a>
                      </Popconfirm>
                    </Menu.Item>
                    <Menu.Item>
                      <a href="javascript: void(0);">个人设置</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a href="javascript: void(0);">系统设置</a>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomCenter">
                <Avatar style={{float: 'right', margin: '11px 40px 0 20px'}} size="large" src="../src/assets/Rikka.gif"/>
              </Dropdown>
              <span style={{float: 'right', color: '#fff', fontSize: 20, fontWeight: 600,textShadow: '0 1px 1px #000' }}>{this.state.user ? this.state.user : 'admin'}</span>
            </Header>
            <Content>
              <Breadcrumb style={{ padding: '12px', backgroundColor: '#fff'}}>
                <Breadcrumb.Item>home</Breadcrumb.Item>
                <Breadcrumb.Item>shelve</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: '12px', background: '#fff', flex:1,overflowX: 'hidden' }}>
                {this.props.children}
              </div>
            </Content>
          </Layout>
        </Layout>
      );
    }else {
      return <div></div>;
    }
  }
}

const mapToState = function(state){
  return {
    resPath: state.home.routePath || ''
  }
}

export default connect(mapToState, HomeAction)(Home);