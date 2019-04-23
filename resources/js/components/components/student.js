import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StudentEdit from './studentEdit';
import * as requestActionCreators from '../actions/requestActions';
import {isRole} from "../actions/roleActions";

export class StudentList extends Component {

    constructor(props) {
        super(props);
        this.props.getTable({name: "student"});

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    createStudentList() {
        const {table, selectedStudent} = this.props;
        return table ?
            (
                <table border="1">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Olympiads</th>
                    </tr>
                    {
                        table.map((student) => (
                            <tr key={student.id} className={student.id === selectedStudent ? "selected" : ""}
                                onClick={this.studentSelected(student.id)}>
                                <td className="name"> {student.last_name} </td>
                                <td className="role"> {student.user_role} </td>
                                <td className="olympiads"> {student.olympiads} </td>
                            </tr>))
                    }
                    </tbody>
                </table>
            ) : "Empty student's list";
    }

    handleDelete(student) {
        const {deleteTable, getTable} = this.props;
        deleteTable({name: "student", id: student}).then(getTable({name: "student"}));
    }

    studentEdit(props, button) {
        props.getStudentEdit({}, "", false);
        if (button != "edit" || props.selectedStudent != -1) {
            const student = props.table.find(v => v.id === props.selectedStudent) || {};
            props.getStudentEdit(student, button, true);
        }
        if (button == "add") {
            props.getStudentEdit({}, button, true);
        }
        if (button == "delete") {
            props.getStudentEdit({}, "", false);
            this.handleDelete(props.selectedStudent);
        }
    }

    studentSelected(STUDENT_ID) {
        return () => {
            this.props.getStudentEdit({}, "", false);
            this.props.selectStudent(STUDENT_ID);
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const studentEdit = document.getElementsByClassName("studentEdit")[0];

        if (!event.path.includes(studentEdit)) {
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.props.selectStudent(-1);
                this.props.getStudentEdit({}, "", false);
            }
        }
    }

    render() {
        return (
            isRole(this.props.role, ["admin"]) ?
                <div className="Student" ref={this.setWrapperRef}>
                    <h4>Students</h4>
                    {this.createStudentList()}
                    <button
                        className="add"
                        onClick={() => this.studentEdit(this.props, "add")}>
                        add
                    </button>
                    <button
                        className="edit"
                        hidden={this.props.selectedStudent < 0}
                        onClick={() => this.studentEdit(this.props, "edit")}>
                        edit
                    </button>
                    <button
                        className="delete"
                        hidden={this.props.selectedStudent < 0}
                        onClick={() => this.studentEdit(this.props, "delete")}>
                        delete
                    </button>
                    <div>
                        <StudentEdit getTable={this.props.getTable}/>
                    </div>
                </div> : "You don't have permission to be here"
        );
    }
}


const mapStateToProps = function (state) {
    return {
        table: state.studentStore.table,
        selectedStudent: state.studentStore.selectedStudent
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getStudentEdit: actionCreators.getStudentEdit,
        getTable: requestActionCreators.getTable,
        selectStudent: actionCreators.selectStudent,
        deleteTable: requestActionCreators.deleteTable
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList)
