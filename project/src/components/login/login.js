import React from 'react';
import { hashHistory} from 'react-router'
import { Icon, Form, Input, Button, message, Checkbox, Modal } from 'antd';
import qs from 'qs';

import './login.scss';
import http from '../../utils/ajax'

const FormItem = Form.Item;
const confirm = Modal.confirm;

class Login extends React.Component {
  state = {
    loading: false
  }

  handleSubmit = (e) => {
    this.setState({loading: true});
    e.preventDefault();
    // 记住登录密码判断
    let remember = this.props.form.getFieldValue('remember');
    let username = this.props.form.getFieldValue('username').trim();
    let password = this.props.form.getFieldValue('password').trim();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        http.post('adminUser.php',qs.stringify({ username: username, password: password}))
        .then(res => {
          this.setState({loading: false});
          if(res.data === 'ok'){
            // 记住登录密码
            remember ? localStorage.setItem('token', username) : sessionStorage.setItem('token', password);
            hashHistory.push('/');
          }else {
            message.error('登录失败，账号或密码错误');
          }
        })
        .catch(err => {});
      }
    });
  }
  
  componentWillMount() {
    let token = localStorage.getItem('token');
    if(token){
      Modal.confirm({
        title: '检测到登录信息已存在，是否重新登录？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          sessionStorage.removeItem('token');
          localStorage.removeItem('token');
        },
        onCancel() {
          hashHistory.push('/');
        }
      });
    }
  }

  render () {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="container">
        <div className="main">
          <header>哈尼哈尼后台登录</header>
          <section className="login">
            <Form onSubmit={this.handleSubmit} >
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入账号',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="text" addonBefore={<Icon type="user"/>}/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="password" addonBefore={<Icon type="lock"/>}/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住密码</Checkbox>
                )}
              </FormItem>
              <Button 
                className="btnLogin" 
                type="primary" 
                htmlType="submit" 
                loading={this.state.loading}>
                登 录
              </Button>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}

Login = Form.create({})(Login);

export default Login