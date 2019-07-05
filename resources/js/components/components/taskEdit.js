import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as requestActionCreators from '../actions/requestActions';
import {Button, Icon, Input, Form, TimePicker} from "antd";
import moment from 'moment';

const format = 'HH:mm';

export class TaskEdit extends Component {

    constructor(props) {
        super(props);
    }

    timeFormat(time) {
        let date = new Date(time);
        return date.getHours() + ':' + date.getMinutes() + ':00';
    }

    handleChange(time = null, timeString = null) {
        if (time === null) {
            return (event) => {
                let name = event.target.name;
                let value = event.target.value;
                if (name === "hardness" && (value > 10 || value < 0))
                    return;
                if (name === "max_score" && (value > 100 || value < 0))
                    return;
                this.props.getTaskEdit(Object.assign({}, this.props.table, {[name]: value}), this.props.olympiadID, true);
            }
        } else {
            this.props.getTaskEdit(Object.assign({}, this.props.table, {['time']: this.timeFormat(time)}), this.props.olympiadID, true);
        }
    }

    handleSubmit() {
        const {table, postTable} = this.props;
        table.olympiad_id = this.props.olympiadID;
        let data = table;
        data['type'] = this.props.type;
        data['field'] = this.props.field;
        data = JSON.stringify(data);
        if (table.id)
            postTable({name: "task", data: data, method: "PUT", id: this.props.olympiadID});
        else
            postTable({name: "task", data: data, method: "POST", put_id: table.id, id: this.props.olympiadID});
        this.hide();
    }

    hide() {
        this.props.getTaskEdit({}, -1, false);
    }

    handleDisable() {

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
                            name='name'
                            value={table.name}
                            onChange={this.handleChange().bind(this)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Description"
                            name='description'
                            value={table.description}
                            onChange={this.handleChange().bind(this)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="number" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Hardness"
                            name='hardness'
                            type='number'
                            value={table.hardness}
                            min={0}
                            max={10}
                            onChange={this.handleChange().bind(this)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="number" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Max score"
                            name='max_score'
                            type='number'
                            value={table.max_score}
                            min={0}
                            max={10}
                            onChange={this.handleChange().bind(this)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <TimePicker
                            name='time'
                            disabledHours={() => [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
                            format={format}
                            value={moment(table.time ? table.time : '00:00:00', format)}
                            onChange={this.handleChange.bind(this)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                disabled={
                                    !table ||
                                    (!table.hardness || table.hardness === '') ||
                                    (!table.name || table.name === '') ||
                                    (!table.description || table.description === '') ||
                                    (!table.max_score || table.max_score === '') ||
                                    (!table.time || table.time === '0:0:00')
                                }
                                onClick={this.handleSubmit.bind(this)} className="login-form-button">
                            Ok
                        </Button>
                        <Button onClick={this.hide.bind(this)}>Cancel
                        </Button>
                    </Form.Item>
                </Form>) : ""
        );
    }

}

const mapStateToProps = function (state) {
    return {
        table: state.taskEditStore.table,
        show: state.taskEditStore.show,
        olympiadID: state.taskEditStore.olympiadID,
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getTaskEdit: actionCreators.getTaskEdit,
        postTable: requestActionCreators.postTable,
        deleteTable: requestActionCreators.deleteTable
    }, dispatch)
}

const TaskEditForm = Form.create({name: 'taskEdit'})(connect(mapStateToProps, mapDispatchToProps)(TaskEdit));
export default TaskEditForm;
