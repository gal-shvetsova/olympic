import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


export class TaskEdit extends Component {

    handleChange(field) {
        const {task, getTaskEdit} = this.props;
        return (event) => {
            const change = {};
            if (field == "hardness" && (event.target.value > 10 || event.target.value < 0))
                return;
            if (field == "minutes") {
                change["time"] = document.getElementById("hours").value + ":" + event.target.value;
            }
            else if (field == "hours") {
                change["time"] = event.target.value + ":" + document.getElementById("minutes").value;
            }
            else
                change[field] = event.target.value;
            getTaskEdit(Object.assign({}, task, change), this.props.olympiadID, true);
        };
    }

    handleSubmit() {
        const {task, olympiadID, getTask} = this.props;
        let method = this.props.task.id ? "PUT" : "POST";
        if (!task) method = "POST";
        let site =  "/api/task/" + olympiadID;
        fetch(site, {
            method,
            body: JSON.stringify(task)
        })
            .then(function (response) {
                if (response.ok) {
                    fetch(site)
                        .then(function (response) {
                            if (response.ok) {
                                response.json()
                                    .then(v => getTask(v, olympiadID));
                            } else {
                                response.json()
                                    .then(data => alert(data.error));
                            }
                        })
                } else {
                    response.json()
                        .then(data => alert(data.error));
                }
            });
        this.hide();
    }

    hide() {
        this.props.getTaskEdit({}, -1, false);
    }

    render() {
        const task = this.props.task;
        return (
            this.props.show ? (
                    <div className="taskEdit">
                        <p>Name</p>
                        <input type="text" value={task.name || ""} onChange={this.handleChange("name")}/>
                        <p>Description</p>
                        <input type="text" value={task.description || ""} onChange={this.handleChange("description")}/>
                        <p>Hardness</p>
                        <input type="number" value={task.hardness || ""} onChange={this.handleChange("hardness")}/>
                        <p>Time</p>
                        <input type="range" id="hours" min = "0" max = "6" value= { task.time != undefined ? task.time.split(":")[0] : 0} onChange={this.handleChange("hours")}/>
                        <input type="range" id="minutes" min = "0" max = "59" value={ task.time != undefined?  task.time.split(":")[1] : 0} onChange={this.handleChange("minutes")}/>
                        <p/>
                        <button className="ok" onClick={this.handleSubmit.bind(this)}>ok</button>
                        <button className="cancel" onClick={this.hide.bind(this)}>cancel</button>
                    </div>)
                : "");
    }
}

const mapStateToProps = function (state) {
    return {
        task: state.taskEditStore.task,
        show: state.taskEditStore.show,
        olympiadID: state.taskEditStore.olympiadID,
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getTaskEdit: actionCreators.getTaskEdit,
        getTask: actionCreators.getTask,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)
