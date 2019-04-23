import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TaskEdit from './taskEdit';
import * as requestActionCreators from '../actions/requestActions';
import {hasRole, isRole} from "../actions/roleActions";

export class TaskList extends Component {

    constructor(props) {
        super(props);
        console.log("here");
        const {getTable, olympiadID} = this.props;
        getTable({name : "task", id : olympiadID});
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        //    const {getTask, olympiadID} = this.props;
        //  fetch('api/task/' + olympiadID)
        //      .then(function (response) {
        //        if (response.ok) {
        //           response.json()
        //               .then(v => getTask(v))
        //      } else {
        //         response.json()
        //            .then(data => alert(data.error));
        //    }
        //  })
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
                </tr>
                {
                    table.map((task) => (<tr key={task.id} className={task.id === selectedTask ? "selected" : ""}
                                             onClick={this.taskSelected(task.id, selectTask)}>
                        <td className="name"> {task.name} </td>
                        <td className="description"> {task.description} </td>
                        <td className="hardness"> {task.hardness} </td>
                        <td className="time"> {task.time} </td>
                    </tr>))
                }
                </tbody>
            </table>
        )
    }


    handleDelete(task) {
        const {deleteTable, getTable} = this.props;
        deleteTable({name : "task", data : task, id : task});//.then(getTable({name : "olympiad"}));
    }

    taskEdit(props, button) {
        alert(props.olympiadID);
        props.getTaskEdit({}, props.olympiadID, false);
        if (button != "edit" || props.selectedTask != undefined) {
            const table = props.table.find(v => v.id === props.selectedTask) || {};
            props.getTaskEdit(table, props.olympiadID, true);
        }
        if (button == "add") {
            props.getTaskEdit({olympiad_id: props.olympiadID}, props.olympiadID, true);
        }
        if (button == "delete") {
            const table = props.table.find(v => v.id === props.selectedTask) || {};
            this.handleDelete(table);
            props.getTaskEdit({olympiad_id: props.olympiadID}, props.olympiadID, false);
        }
    }

    taskSelected(ID, selectTask) {
        return () => {
            selectTask(ID);
        };
    }

    handleToOlym() {
        window.location.href ="http://olympic.test/olympiad";
    }

    render() {
        return (
            <div className="Task" ref={this.setWrapperRef}>
                <h4>Tasks</h4>
                <div className="taskList">
                    {this.createTaskList()}
                    <div>
                        <button className="add"
                                onClick={() => this.taskEdit(this.props, "add")}
                                hidden = {isRole(this.props.role, ["admin"])}>add
                        </button>
                        <button className="edit"
                                onClick={() => this.taskEdit(this.props, "edit")}
                                hidden = {isRole(this.props.role, ["admin"])}>edit
                        </button>
                        <button className="delete"
                                onClick={() => this.taskEdit(this.props, "delete")}
                                hidden = {isRole(this.props.role, ["admin"])}>delete
                        </button>
                        <button className="solve"
                                onClick={() => this.taskEdit(this.props, "solve")}
                                hidden = {isRole(this.props.role, ["participant"])}>solve
                        </button>
                        <button className="back"
                                onClick={() => this.handleToOlym()}>to olympiads
                        </button>
                    </div>
                </div>
                <TaskEdit  getTable = {this.props.getTable}/>
            </div>);
    }

}

const mapStateToProps = function (state) {
    return {
        table: state.taskStore.table,
        selectedTask: state.taskStore.selectedTask,
        olympiadID: state.taskStore.olympiadID
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
