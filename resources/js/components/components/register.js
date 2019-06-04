import React, {Component} from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import {Link} from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name : ' ',
        }
    }

    handleUserInput() {
        return (e) => {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({[name]: value});
        }
    };

    handleRegister() {
        return (e) => {
            e.preventDefault();
            message.info('Wait a sec');
            this.props.registerUser(this.state.name, this.state.email, this.state.password, this.props.history);
            this.setState( {
                email: '',
                password: '',
                name : ' ',
            });
            this.props.form.setFieldsValue({
                email: '',
                password: '',
                name : ' ',
            });
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="form">
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Name"
                            name = 'name'
                            onChange={this.handleUserInput().bind(this)}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' },{
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },],
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            name = 'email'
                            onChange={this.handleUserInput().bind(this)}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })
                    (
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            name='password'
                            onChange={this.handleUserInput().bind(this)}
                        />,
                    )}
                </Form.Item>
                    <Button type="primary" disabled={this.state.email === '' || this.state.password === '' || this.state.name === ''} onClick={this.handleRegister()} className="register-form-button">
                        Register
                    </Button>
                    Or <Link to='/login'>log in</Link> now!
            </Form>
        );
    }
}
const RegisterForm = Form.create({ name: 'register' })(Register);
export default RegisterForm;