import React from 'react'
import style from './home.scss'
import { Router, Route, hashHistory, Link } from 'react-router'
import { Menu, Breadcrumb, Icon, Layout, Modal, Button } from 'antd';


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class Home extends React.Component {
  state = {
    mode: 'inline',
    token: true
  }

  componentWillMount() {
    let token = sessionStorage.getItem('token');
    if(!token){
      this.setState({token: false});
      Modal.warning({
        title: '登录信息已过期或者登录信息不存在，请重新登录！',
        onOk(){
          hashHistory.push('login');
        }
      });
    }
  }

  render() {
    if(this.state.token) {
      return (
        <Layout>
          <Sider>
            <div className="logo">哈尼哈尼后台管理系统</div>
            <Menu mode={this.state.mode} defaultSelectedKeys={['4']}>
              <Menu.SubMenu key="sub1" title={<span><Icon type="file" /><span className="nav-text">商品管理</span></span>}>
                <Menu.Item key="1"><Link to="products">商品信息</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/addProduct">商品录入</Link></Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="3">
                <Link to="/a">
                  <Icon type="user" />
                  <span className="nav-text">用户管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/">
                  <Icon type="file-add" />
                  <span className="nav-text">用户反馈</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#1890ff', padding: 0 }}></Header>
            <Content style={{ margin: '0 12px 12px' }}>
              <Breadcrumb style={{ margin: '12px 0'}}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: '12px 12px', background: '#fff', flex:1, overflowX: 'hidden'}}>
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