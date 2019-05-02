import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import olympiad from "./olympiad";
import * as requestActionCreators from '../actions/requestActions';

export class TaskEdit extends Component {

    handleChange(field) {
        const {table, getTaskEdit} = this.props;
        return (event) => {
            const change = {};
            if (field == "hardness" && (event.target.value > 10 || event.target.value < 0))
                return;
            if (field == "max_score"  && (event.target.value > 100 || event.target.value < 0))
                return;
            if (field == "minutes") {
                change["time"] = document.getElementById("hours").value + ":" + event.target.value;
            }
            else if (field == "hours") {
                change["time"] = event.target.value + ":" + document.getElementById("minutes").value;
            }
            else
                change[field] = event.target.value;
            getTaskEdit(Object.assign({}, table, change), this.props.olympiadID, true);
        };
    }

    handleSubmit() {
        const {table, postTable, getTable} = this.props;
        table.olympiad_id = this.props.olympiadID;
        if (table.id)
            postTable({name: "task", data : JSON.stringify(table), method : "PUT", id : table.olympiadID }).then(getTable({name: "olympiad"}));
        else
            postTable({name: "task", data : JSON.stringify(table), method : "POST", put_id : table.id, id : table.olympiadID }).then(getTable({name: "olympiad"}));
        this.hide();
    }

    hide() {
        this.props.getTaskEdit({}, -1, false);
    }

    render() {
        const table = this.props.table;
        return (
            this.props.show ? (
                    <div className="taskEdit">
                        <p>Name</p>
                        <input type="text" value={table.name || ""} onChange={this.handleChange("name")}/>
                        <p>Description</p>
                        <input type="text" value={table.description || ""} onChange={this.handleChange("description")}/>
                        <p>Hardness</p>
                        <input type="number" value={table.hardness || ""} onChange={this.handleChange("hardness")}/>
                        <p>Time</p>
                        <input type="range" id="hours" min = "0" max = "6" value= { table.time != undefined ? table.time.split(":")[0] : 0} onChange={this.handleChange("hours")}/>
                        <input type="range" id="minutes" min = "0" max = "59" value={ table.time != undefined?  table.time.split(":")[1] : 0} onChange={this.handleChange("minutes")}/>
                        <p/>
                        <p>Max score</p>
                        <input type="number" value={table.max_score || ""} onChange={this.handleChange("max_score")}/>
                        <button className="ok" onClick={this.handleSubmit.bind(this)}>ok</button>
                        <button className="cancel" onClick={this.hide.bind(this)}>cancel</button>
                    </div>)
                : "");
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
        deleteTable : requestActionCreators.deleteTable
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)
