import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as requestActionCreators from '../actions/requestActions';

export class TaskEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            description : '',
            hardness: '',
            max_score: '',
            time: '',
            formValid: false
        }
    }

    handleChange() {
        return (event) => {
            event.preventDefault();
            let name = event.target.name;
            let value = event.target.value;
            if (name === "hardness" && (value > 10 || value < 0))
                return;
            if (name === "max_score"  && (value > 100 || value  < 0))
                return;
            if (name === "minutes") {
                value = document.getElementById("hours").value + ":" + value;
            }
            else if (name === "hours") {
                value = value + ":" + document.getElementById("minutes").value;
            }

            if (name === "minutes" || name === "hours") name = "time";
            this.props.getTaskEdit(Object.assign({}, this.props.table, {[name]: value}), this.props.olympiadID, true);
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
            postTable({name: "task", data : data, method : "PUT", id : this.props.olympiadID });
        else
            postTable({name: "task", data : data, method : "POST", put_id : table.id, id : this.props.olympiadID });
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
                    <form className="form">
                        <div className={`form-group`}>
                            <label htmlFor="name">Name</label>
                            <input type="text" required className="form-control" name="name"
                                   value={table.name || ""}
                                   onChange={this.handleChange("name")}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" name="description"
                                   value={table.description || ""}
                                   onChange={this.handleChange()}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="hardness">Hardness</label>
                            <input type="number" className="form-control" name="hardness"
                                   value={table.hardness || ""}
                                   onChange={this.handleChange()}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="max_score">Max score</label>
                            <input type="number" className="form-control" name="max_score"
                                   value={table.max_score || ""}
                                   onChange={this.handleChange()}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="time">Time</label>
                            <input type="range" className="form-control" id ="hours" name="hours" min ="0" max="6" value= {table.time ? table.time.split(":")[0] : 0} onChange={this.handleChange()}/>
                            <input type="range" className="form-control" id="minutes" name="minutes" min="0" max="59" value={ table.time ? table.time.split(":")[1] : 0 } onChange={this.handleChange()}/>
                        </div>
                        <button type="button" className="btn btn-primary" disabled={!(table.name && table.description && table.hardness && table.max_score && table.time)}
                                onClick={this.handleSubmit.bind(this)}>Ok
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.hide.bind(this)}>Cancel</button>
                    </form>
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
