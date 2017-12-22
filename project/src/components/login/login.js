import React from 'react';
import { hashHistory} from 'react-router'
import { Icon, Form, Input, Button, message, Checkbox } from 'antd';
import style from './login.scss';

import http from '../../utils/ajax'

const FormItem = Form.Item;

class Login extends React.Component {
  state = {
    loading: false,
    checked: false
  }

  handleSubmit (e) {
    e.preventDefault();
    this.setState({loading: true});
    this.props.form.validateFields((err, values) => {
      if (!err) {
        http.get('adminUser.php',{params: {username: this.props.form.getFieldValue('account').trim(), password: this.props.form.getFieldValue('password').trim()}})
          .then(res => {
            this.setState({loading: false});
            if(res.data === 'ok'){
              sessionStorage.setItem('token', this.props.form.getFieldValue('account'));
              hashHistory.push('/');
            }else {
              message.error('登录失败，账号或密码错误');
            }
          })
          .catch(err => {})
      }
    });
  }
  
  isChecked(e) {
    this.setState({checked: !e.target.checked})
  }

  render () {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="container">
        <div className="main">
          <header>哈尼哈尼后台登录</header>
          <section className="login">
            <Form onSubmit={this.handleSubmit.bind(this)} >
              <FormItem>
                {getFieldDecorator('account', {
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
                  <Checkbox onClick={this.isChecked.bind(this)}>记住密码</Checkbox>
                )}
              </FormItem>
              <Button className="btnLogin" type="primary" htmlType="submit" loading={this.state.loading} disabled={this.state.loading}>登 录</Button>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}

// Login.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

Login = Form.create({})(Login);

export default Login