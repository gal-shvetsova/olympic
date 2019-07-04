import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TaskEdit from './taskEdit';
import * as requestActionCreators from '../actions/requestActions';
import {isRole} from "../actions/roleActions";
import * as sortAction from "../actions/sortAction";
import {Button, Form, Select, Slider} from "antd";
import * as filterAction from "../actions/filterAction";

export class TaskList extends Component {

    constructor(props) {
        super(props);
        const {getTable, olympiad_id} = this.props;
        this.state = {
            sortName : "id",
            sortType : 'asc',
            hardness_filter: [1, 10],
            time_filter: [0, 7],
            max_score_filter: [0, 100]
        };
        getTable({name: "task", id: olympiad_id});
    }

    createTaskList() {
        const {table, selectedTask, selectTask} = this.props;
        return (
            <table border="1">
                <tbody>
                <tr>
                    <th onClick={() => this.handleSort("last_name")}>Name</th>
                    <th onClick={() => this.handleSort("description")}>Description</th>
                    <th onClick={() => this.handleSort("hardness")}>Hardness</th>
                    <th onClick={() => this.handleSort("time")}>Time</th>
                    <th>Max score</th>
                </tr>
                {
                    table.map((task) => (<tr key={task.id} className={task.id === selectedTask ? "selected" : ""}
                                             onClick={this.taskSelected(task.id, selectTask)}>
                        <td className="name"> {task.name} </td>
                        <td className="description"> {task.description} </td>
                        <td className="hardness"> {task.hardness} </td>
                        <td className="time"> {task.time} </td>
                        <td className="max_score"> {task.max_score} </td>
                    </tr>))
                }
                </tbody>
            </table>
        )
    }

    handleSort(name) {
        this.setState({
            sortName : name,
            sortType : this.state.sortType === 'asc' ? 'desc' : 'asc'
        });
        const type = this.state.sortType === 'asc' ? 'desc' : 'asc';
        this.props.filterTable({name: "task", data: {field : name, type : type, hardness_filter: this.state.hardness_filter,
                time_filter: this.state.time_filter, max_score_filter : this.state.max_score_filter,
                olympiad_id : this.props.olympiad_id}});
    }

    handleDelete(task) {
        const {deleteTable } = this.props;
        deleteTable({name: "task", id: task, type : this.state.sortType, field : this.state.sortName});
    }

    handleReset(){
        this.setState(  {

            hardness_filter: [1, 10],
            time_filter: [0, 7],
            max_score_filter: [0, 100]
        });
        this.props.filterTable({name: "task", data: {field : this.state.sortName, type : this.state.sortType,
                hardness_filter: [1,10], time_filter: [0, 7], max_score_filter : [0, 100],
                olympiad_id : this.props.olympiad_id}});
    }

    handleFilterSort() {
        this.props.filterTable({name: "task", data: {field : this.state.sortName, type : this.state.sortType,
                hardness_filter : this.state.hardness_filter, time_filter: this.state.time_filter,
                max_score_filter : this.state.max_score_filter, olympiad_id : this.props.olympiad_id}});
    }


    taskEdit(props, button) {
        this.handleReset();
        props.getTaskEdit({}, props.olympiad_id, false);
        if (button != "edit" || props.selectedTask != undefined) {
            const table = props.table.find(v => v.id === props.selectedTask) || {};
            props.getTaskEdit(table, props.olympiad_id, true);
        }
        if (button == "add") {
            props.getTaskEdit({olympiad_id: props.olympiadID}, props.olympiad_id, true);
        }
        if (button == "delete") {
            const table = props.table.find(v => v.id === props.selectedTask) || {};
            this.handleDelete(table);
            props.getTaskEdit({olympiad_id: props.olympiadID}, props.olympiad_id, false);
        }
    }

    taskSelected(ID, selectTask) {
        return () => {
            selectTask(ID);
        };
    }

    handleToOlympiad() {
        this.props.history.push("/olympiad");
    }

    handleFilter() {
        this.props.filterTable({name: "task", data: {hardness_filter: this.state.hardness_filter,
                time_filter : this.state.time_filter, max_score_filter: this.state.max_score_filter,
                olympiad_id : this.props.olympiad_id, }});
    }


    render() {
        return (isRole(this.props.role, ["admin", "participant"]) ?
                <div className="Task" ref={this.setWrapperRef}>
                    <Form className={'filter'}>
                        <Form.Item
                            label="Hardness">
                            <Slider range defaultValue={[1, 10]}
                                    min={1}
                                    max={10}
                                    style={{width: 100}}
                                    value={this.state.hardness_filter}
                                    onChange={(value) => this.setState({
                                        ["hardness_filter"]: value

                                    })}/>
                        </Form.Item>
                        <Form.Item
                            label="Time">
                            <Slider range defaultValue={[0, 7]}
                                    min={0}
                                    max={7}
                                    style={{width: 100}}
                                    value={this.state.time_filter}
                                    onChange={(value) => this.setState({
                                        ["time_filter"]: value

                                    })}/>
                        </Form.Item>
                        <Form.Item
                            label="Max score">
                            <Slider range defaultValue={[0, 100]}
                                    min={0}
                                    max={100}
                                    style={{width: 100}}
                                    value={this.state.max_score_filter}
                                    onChange={(value) => this.setState({
                                        ["max_score_filter"]: value

                                    })}/>
                        </Form.Item>
                        <Button type="primary" onClick={this.handleFilterSort.bind(this)}>Ok</Button>
                        <Button type="primary" onClick={this.handleReset.bind(this)}>Reset</Button>
                    </Form>
                    <h4>Tasks</h4>
                    <div className="taskList">
                        {this.createTaskList()}
                        <div>
                            <Button className="add"
                                    onClick={() => this.taskEdit(this.props, "add")}
                                    hidden={!isRole(this.props.role, ["admin"]) && this.props.selectedTask < 0}
                            >add
                            </Button>

                            <Button className="edit"
                                     onClick={() => this.taskEdit(this.props, "edit")}
                                     hidden={!isRole(this.props.role, ["admin"]) && this.props.selectedTask < 0}
                            >edit
                            </Button>


                            <Button className="delete"
                                    onClick={() => this.taskEdit(this.props, "delete")}
                                    hidden={!isRole(this.props.role, ["admin"]) && this.props.selectedTask < 0}
                            >delete
                            </Button>

                            <Button className="back"
                                    onClick={() => this.handleToOlympiad()}
                                    hidden={!isRole(this.props.role, ["admin"]) && this.props.selectedTask < 0}
                            >to olympiads
                            </Button>
                        </div>
                    </div>
                    <TaskEdit type={this.state.sortType} field={this.state.sortName} getTable={this.props.getTable}/>
                </div> : "You don't have permissions"
        );
    }

}

const mapStateToProps = function (state) {
    return {
        table: state.taskStore.table,
        selectedTask: state.taskStore.selectedTask,
        olympiad_id : state.taskStore.olympiadID
    }
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getTaskEdit: actionCreators.getTaskEdit,
        getTable: requestActionCreators.getTable,
        selectTask: actionCreators.selectTask,
        sortTable : sortAction.sortTable,
        filterTable: filterAction.filterTable,
    }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
