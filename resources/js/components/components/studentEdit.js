import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as requestActionCreators from "../actions/requestActions";

export class StudentEdit extends Component {

    handleChange(field) {
        const {table, action, getStudentEdit} = this.props;
        return (event) => {
            const change = {};
            change[field] = event.target.value;
            getStudentEdit(Object.assign({}, table, change), action, true);
        };
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
//TODO if empty not send
    render() {
        const table = this.props.table;
        return this.props.show ?
            <div className="studentEdit">
                <p>Last name</p>
                <input type="text" value={table.last_name || ""} onChange={this.handleChange("last_name")}/>
                <p>Role</p>
                <select value={table.user_role || ""} onChange={this.handleChange("user_role")}>
                    <option value="admin">admin</option>
                    <option value="student">student</option>
                </select>
                <div hidden={this.props.action != "add"}>
                    <p>E-mail</p>
                    <input type="text" value={table.email || ""} onChange={this.handleChange("email")}/>
                </div>
                <button type="text" className="ok" onClick={this.handleSubmit.bind(this)}>ok</button>
                <button className="cancel" onClick={this.hide.bind(this)}>cancel</button>
            </div> : "";
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
