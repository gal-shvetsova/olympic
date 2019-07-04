import React from "react";
import {Link} from "react-router-dom";
import {Button, Icon, Input, Form} from "antd";
import {Typography} from 'antd';

const {Paragraph} = Typography;
const password_lenght = 10;
const login_lenght = 5;
const password_set = "abcdefghijklmnopqrstuvwxyz1234567890";
const login_set = "ABCDEFGHIJKLMNOPRSTUVWXYZ";

function password() {
    let password = ""
    for (let ma = 0; ma < password_lenght; ma++) {
        password += password_set[Math.floor(Math.random() * password_set.length)];
    }
    return password;
}

function login() {
    let login = "";
    for (let ma = 0; ma < login_lenght; ma++) {
        login += login_set[Math.floor(Math.random() * login_set.length)];
    }
    return login;
}

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: login() + '@olympic.test',
            password: password()
        }
    }

    handleJoin() {
            this.props.registerParticipant({
                login: this.state.login,
                password: this.state.password,
                olympiad_id: this.props.olympiad_id,
                role: "participant",
                student_id: this.props.student_id,
                id : this.props.id
            });
            this.props.history.push('/olympiad');
       // document.location.href = "/olympiad";
    }

    render() {
        return (
            <Form className='Join'>
                <Form.Item
                    label='Email'>
                    <Paragraph copyable>{this.state.login}</Paragraph>
                </Form.Item>
                <Form.Item
                    label='Password'>
                    <Paragraph copyable>{this.state.password}</Paragraph>
                </Form.Item>
                <Button onClick={this.handleJoin.bind(this)}>Join</Button>
                <Button onClick={() => document.location.href = "/olympiad"}>Back</Button>
            </Form>
        );
    }
}


export default Join;
