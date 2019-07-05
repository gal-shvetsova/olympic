import React, {Component} from 'react';
import {Form} from "antd";
import {Button, Checkbox, Icon, Input} from "antd";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
        }
    }

    handleUserInput() {
        return (e) => {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({[name]: value});
        }
    };

    handleReset() {
        return (e) => {
            e.preventDefault();
            this.props.resetPassword(this.state.newPassword, this.state.oldPassword, this.props.email);
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form className="form">
                <Form.Item>
                    {getFieldDecorator('oldPassword', {
                        rules: [{required: true, message: 'Please input your Password!'}]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Old password"
                            name='oldPassword'
                            onChange={this.handleUserInput().bind(this)}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('newPassword', {
                        rules: [{required: true, message: 'Please input your Password!'},
                            {min: 8, message: 'Password is too short'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="New password"
                            name='newPassword'
                            onChange={this.handleUserInput().bind(this)}
                        />,
                    )}
                </Form.Item>
                <Button type="primary" disabled={this.state.oldPassword === '' || this.state.newPassword === ''}
                        onClick={this.handleReset()} className="login-form-button">
                    Reset
                </Button>
            </Form>
        );
    }
}


const ResetPasswordForm = Form.create({name: 'login'})(ResetPassword);
export default ResetPasswordForm;