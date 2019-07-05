import React, {Component} from 'react';
import {Redirect} from 'react-router'
import {Button, Form} from "antd";

class Verify extends Component {

    constructor(props) {
        super(props);
        this.props.verifyEmail(this.props.history.location.pathname);
        this.state = {ok: false};
    }

    render() {
        return (
            !this.state.ok ?
                <Form className="form">
                    <Button
                        className='verify-form-button'
                        onClick={() => this.setState({ok: true})}>
                        To login
                    </Button>
                </Form> : <Redirect to="/login"/>
        );
    }

}

const VerifyForm = Form.create({name: 'verify'})(Verify);
export default VerifyForm;
