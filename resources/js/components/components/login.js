import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from "react-router-dom";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            remember : true
        }
    }

    handleUserInput() {
        return (e) => {
            const name = e.target.name;
            const value = e.target.value;
            value ?
            this.setState({[name]: value}) : this.setState({remember : e.target.checked})
        }
    };

    handleLogin() {
        return (e) => {
            e.preventDefault();
           this.props.loginUser(this.state.email, this.state.password, this.state.remember);
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            name = 'email'
                            onChange={this.handleUserInput().bind(this)}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            name='password'
                            onChange={this.handleUserInput().bind(this)}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox onChange={this.handleUserInput().bind(this)} name='remember'>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>

                    <Button type="primary" disabled={this.state.email === '' || this.state.password === ''} onClick={this.handleLogin()} className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to='/register'>register now!</Link>
                </Form.Item>
            </Form>
        );
    }


}
const LoginForm = Form.create({ name: 'login' })(Login);
export default LoginForm;