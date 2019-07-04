import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as requestActionCreators from "../actions/requestActions";
import {Button, Select, Icon, Input, Form } from "antd";
const {Option} = Select;

export class StudentEdit extends Component {

    handleChange(value = null) {
        const {table, action, getStudentEdit} = this.props;
        if (value === null) {
            return (e) => {
                e.preventDefault();
                const name = e.target.name;
                const value = e.target.value;
                console.log(name, value);
                getStudentEdit(Object.assign({}, table, {[name]: value}), action, true);
            };
        }
        else
            getStudentEdit(Object.assign({}, table, {['user_role']: value}), action, true);
    }

    handleSubmit() {
        const {table, postTable} = this.props;
        let data = table;
        data['type'] = this.props.type;
        data['field'] = this.props.field;
        data = JSON.stringify(data);
        if (!table.id)
            postTable({name: "student", data: data, method: "POST"});
        else
            postTable({
                name: "student",
                data: data,
                method: "PUT",
                id: JSON.stringify(table.id)
            });
        this.hide();
    }

    hide() {
        this.props.getStudentEdit({}, "", false);
    }

    render() {
        const table = this.props.table;
        return (
            this.props.show ? (
                <Form className="editForm">
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Name"
                            name='last_name'
                            value={table.last_name}
                            onChange={this.handleChange().bind(this)}
                        />
                    </Form.Item>
                    <Select defaultValue="student"
                            style={{width: 120}}
                            name='user_role'
                            value={table.user_role}
                            onChange={this.handleChange.bind(this)}>
                        <Option value="admin">admin</Option>
                        <Option value="student">student</Option>
                    </Select>
                    <Form.Item>
                        <Button type="primary" disabled={table.role === '' || table.name === '' }
                                onClick={this.handleSubmit.bind(this)} className="login-form-button">
                            Ok
                        </Button>
                        <Button onClick={this.hide.bind(this)}>Cancel</Button>
                    </Form.Item>
                </Form>) : ""
        );
    }
}


const mapStateToProps = function (state) {
    return {
        table: state.studentEditStore.table,
        action: state.studentEditStore.action,
        show: state.studentEditStore.show,
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getStudentEdit: actionCreators.getStudentEdit,
        getTaskEdit: actionCreators.getTaskEdit,
        postTable: requestActionCreators.postTable,
        deleteTable: requestActionCreators.deleteTable
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentEdit)
