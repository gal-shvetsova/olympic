import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TaskEdit from './taskEdit';
import * as requestActionCreators from '../actions/requestActions';
import {isRole} from "../actions/roleActions";

export class TaskList extends Component {

    constructor(props) {
        super(props);
        const {getTable, olympiad_id} = this.props;
        getTable({name: "task", id: olympiad_id});
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    handleClickOutside(event) {
        const taskEdit = document.getElementsByClassName("taskEdit")[0];

        if (!event.path.includes(taskEdit)) {
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.props.selectTask(-1);
                this.props.getTaskEdit({}, false);
            }
        }
    }

    createTaskList() {
        const {table, selectedTask, selectTask} = this.props;
        return (
            <table border="1">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Hardness</th>
                    <th>Time</th>
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


    handleDelete(task) {
        const {deleteTable, getTable} = this.props;
        deleteTable({name: "task", data: task, id: task}).then(getTable({name : "olympiad"}));
    }

    taskEdit(props, button) {
        alert(props.olympiad_id);
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

    handleToOlym() {
        this.props.history.push("/olympiad");
    }

    render() {
        return (isRole(this.props.role, ["admin", "participant"]) ?
                <div className="Task" ref={this.setWrapperRef}>
                    <h4>Tasks</h4>
                    <div className="taskList">
                        {this.createTaskList()}
                        <div>
                            <button className="add"
                                    onClick={() => this.taskEdit(this.props, "add")}
                                    hidden={!isRole(this.props.role, ["admin"]) && this.props.selectedTask < 0}
                            >add
                            </button>

                            <button className="edit"
                                     onClick={() => this.taskEdit(this.props, "edit")}
                                     hidden={!isRole(this.props.role, ["admin"]) && this.props.selectedTask < 0}
                            >edit
                            </button>


                            <button className="delete"
                                    onClick={() => this.taskEdit(this.props, "delete")}
                                    hidden={!isRole(this.props.role, ["admin"]) && this.props.selectedTask < 0}
                            >delete
                            </button>

                            <button className="back"
                                    onClick={() => this.handleToOlym()}
                                    hidden={!isRole(this.props.role, ["admin"]) && this.props.selectedTask < 0}
                            >to olympiads
                            </button>
                        </div>
                    </div>
                    <TaskEdit getTable={this.props.getTable}/>
                </div> : "You don't have permissions"
        );
    }

}

const mapStateToProps = function (state) {
    return {
        table: state.taskStore.table,
        selectedTask: state.taskStore.selectedTask,
    }
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getTaskEdit: actionCreators.getTaskEdit,
        getTable: requestActionCreators.getTable,
        selectTask: actionCreators.selectTask,
    }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
