import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as requestActionCreators from '../actions/requestActions';
import {Button, Checkbox, Icon, Input, InputNumber, Form, DatePicker} from "antd";
import moment from 'moment';
import {Link} from "react-router-dom";
import {message} from 'antd';
const dateFormat = 'YYYY-MM-DD';
export class OlympiadEdit extends Component {

    constructor(props) {
        super(props);
    }

    handleChange(date = false, dateString = false) {
        console.log(dateString);
        if (dateString === false) {
            return (e) => {
                //e.preventDefault();
                let name, value;
                name = e.target.name;
                value = e.target.value;
                console.log(parseInt(value), name);
                if (name === "hardness" && (parseInt(value) > 10 || parseInt(value) < 0))
                    return;
                this.props.getOlympiadEdit(Object.assign({}, this.props.table, {[name]: value}), true)
            }
        } else {
            let today = new Date();

            if (!date.localeCompare("") && (date < today || date > today.setMonth(today.getMonth() + 1))) {
                message.error("Day has passed");
                return;
            }
            this.props.getOlympiadEdit(Object.assign({}, this.props.table, {['deadline']: date}), true)
        }
    }

    handleSubmit() {
        const {table, postTable} = this.props;
        let data = table;
        data['type'] = this.props.type;
        data['field'] = this.props.field;
        data = JSON.stringify(data);
        if (!table.id)
            postTable({name: "olympiad", data: data, method: "POST"});
        else
            postTable({name: "olympiad", data: data, method: "PUT", id: table.id});
        this.hide();
    }

    hide() {
        this.props.getOlympiadEdit({}, false);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const table = this.props.table;
        return (
            this.props.show ? (
                <Form className="form">
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please input name!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Name"
                                value={table.name}
                                name='name'
                                onChange={this.handleChange.bind(this)}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="number" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="number"
                            name='hardness'
                            type='number'
                            value={table.hardness}
                            min={0}
                            max={10}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <DatePicker
                            className={'date'}
                            style={{width: '50%'}}
                            value={moment(table.deadline, dateFormat) }
                            placeholder={'Pick date'}
                            format={dateFormat}
                            name='deadline'
                            onChange={this.handleChange.bind(this)}
                        />
                    </Form.Item>
                </Form>) : ""
        );
    }

}


const mapStateToProps = function (state) {
    return {
        table: state.olympiadEditStore.table,
        show: state.olympiadEditStore.show,
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getOlympiadEdit: actionCreators.getOlympiadEdit,
        postTable: requestActionCreators.postTable
    }, dispatch)
}


const OlympiadEditForm = Form.create({name: 'olympiadEdit'})(connect(mapStateToProps, mapDispatchToProps)(OlympiadEdit));
export default OlympiadEditForm;