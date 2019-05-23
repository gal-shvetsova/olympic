import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as requestActionCreators from "../actions/requestActions";

export class StudentEdit extends Component {

    handleChange() {
        const {table, action, getStudentEdit} = this.props;
        return (e) => {
            e.preventDefault();
            const name = e.target.name;
            const value = e.target.value;
            getStudentEdit(Object.assign({}, table, {[name] : value}), action, true);
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

    render() {
        const table = this.props.table;
        return (
            this.props.show ?
                <div className="studentEdit">
                    <form className="form">
                        <div className={`form-group`}>
                            <label htmlFor="last_name">Name</label>
                            <input type="text" required className="form-control" name="last_name"
                                   value={table.last_name || ""}
                                   onChange={this.handleChange()}/>
                        </div>
                        <div hidden={this.props.action != "add"}>

                        <div className={`form-group`}>
                            <label htmlFor="email">Email</label>
                            <input type="email" required className="form-control" name="email"
                                   value={table.email || ""}
                                   onChange={this.handleChange()}/>
                        </div>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="user_role">Role</label>
                        <select name ="user_role" value={table.user_role || ""} onChange={this.handleChange()}>
                            <option value="">-</option>
                            <option value="admin">admin</option>
                            <option value="student">student</option>
                        </select>
                        </div>
                        <button type="button" className="btn btn-primary" disabled={!(table.last_name && table.user_role && (!table.email || table.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)))}
                                onClick={this.handleSubmit.bind(this)}>Ok
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.hide.bind(this)}>Cancel</button>
                    </form>
                </div>
                : "");
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
