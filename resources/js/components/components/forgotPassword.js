import React, {Component} from 'react';
import {Button, Form, Icon, Input} from "antd";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    handleUserInput() {
        return (e) => {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({[name]: value});
        }
    };

    handleSend() {
        return (e) => {
            e.preventDefault();
            this.props.forgotPassword(this.state.email);
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form className="form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input your email!'},
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            }],
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Email"
                            name='email'
                            onChange={this.handleUserInput().bind(this)}
                        />,
                    )}
                </Form.Item>
                <Button type="primary" disabled={this.state.email === ''} onClick={this.handleSend()}
                        className="login-form-button">
                    Ok
                </Button>
            </Form>
        );
    }

}

const ForgotPasswordForm = Form.create({ name: 'register' })(ForgotPassword);
export default ForgotPasswordForm;