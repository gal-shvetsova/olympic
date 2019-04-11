import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TaskEdit from './taskEdit';

export class TaskList extends Component {

    constructor(props) {
        super(props);
        const getTask = this.props.getTask;
        fetch('http://olympic.test/api/task/' + props.olympiadID)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(v => getTask(v));
                } else {
                    response.json()
                        .then(function (data) {
                            alert(data.error);
                        })
                }
            });
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
        const {tasks, selectedTask, selectTask} = this.props;
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
                    tasks.map((task) => (<tr key={task.id} className={task.id === selectedTask ? "selected" : ""}
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
        const {getTask, olympiadID} = this.props;
        fetch('http://olympic.test/api/task/' + olympiadID, {
            method: "DELETE",
            body: JSON.stringify(task)
        })
            .then(function (response) {
                if (response.ok) {
                    fetch('http://olympic.test/api/task/' + olympiadID)
                        .then(response => response.json())
                        .then(v => getTask(v));
                } else {
                    response.json()
                        .then(data => alert(data.error));
                }
            });

    }

    taskEdit(props, button) {
        alert(props.olympiadID);
        props.getTaskEdit({}, props.olympiadID, false);
        if (button != "edit" || props.selectedTask != undefined) {
            const task = props.tasks.find(v => v.id === props.selectedTask) || {};
            props.getTaskEdit(task, props.olympiadID, true);
        }
        if (button == "add") {
            props.getTaskEdit({olympiad_id: props.olympiadID}, props.olympiadID, true);
        }
        if (button == "delete") {
            const task = props.tasks.find(v => v.id === props.selectedTask) || {};
            this.handleDelete(task);
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
                                onClick={() => this.taskEdit(this.props, "add")}>add
                        </button>
                        <button className="edit"
                                onClick={() => this.taskEdit(this.props, "edit")}>edit
                        </button>
                        <button className="delete"
                                onClick={() => this.taskEdit(this.props, "delete")}>delete
                        </button>
                        <button className="back"
                                onClick={() => this.handleToOlym()}>to olympiads
                        </button>
                    </div>
                </div>
                <TaskEdit/>
            </div>);
    }

}

const mapStateToProps = function (state) {
    return {
        tasks: state.taskStore.tasks,
        selectedTask: state.taskStore.selectedTask,
        olympiadID: state.taskStore.olympiadID
    }
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getTaskEdit: actionCreators.getTaskEdit,
        getTask: actionCreators.getTask,
        selectTask: actionCreators.selectTask,
    }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
