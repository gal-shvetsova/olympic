import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StudentEdit from './studentEdit';
import * as requestActionCreators from '../actions/requestActions';
import {isRole} from "../actions/roleActions";
import * as sortAction from '../actions/sortAction'
import {Button, Form, Select, Slider} from "antd";
import * as filterAction from "../actions/filterAction";

const {Option} = Select;

export class StudentList extends Component {

    constructor(props) {
        super(props);
        this.props.getTable({name: "student"});
        this.state = {
            sortName: "id",
            sortType: 'asc',
            role_filter: 'all',
            olympiads_filter: [
                0,
                10  //todo close registration if already 10
            ],
        };
    }

    createStudentList() {
        const {table, selectedStudent} = this.props;
        return table ?
            (
                <table border="1">
                    <tbody>
                    <tr>
                        <th onClick={() => this.handleSort("last_name")}>Name</th>
                        <th onClick={() => this.handleSort("user_role")}>Role</th>
                        <th onClick={() => this.handleSort("olympiads")}>Olympiads</th>
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

    handleSort(name) {
        this.setState({
            sortName: name,
            sortType: this.state.sortType === 'asc' ? 'desc' : 'asc'
        });
        const type = this.state.sortType === 'asc' ? 'desc' : 'asc';
        this.props.filterTable({
            name: "student",
            data: {
                field: name,
                type: type,
                role_filter: this.state.role_filter,
                olympiads_filter: this.state.olympiads_filter
            }
        });
    }

    handleDelete(student) {
        const {deleteTable} = this.props;
        deleteTable({name: "student", id: student, type: this.state.sortType, field: this.state.sortName});
    }

    studentEdit(props, button) {
        this.handleReset();
        props.getStudentEdit({}, "", false);
        if (button !== "edit" || props.selectedStudent !== -1) {
            const student = props.table.find(v => v.id === props.selectedStudent) || {};
            props.getStudentEdit(student, button, true);
        }
        if (button === "add") {
            props.getStudentEdit({}, button, true);
        }
        if (button === "delete") {
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

    handleFilter() {
        this.props.filterTable({
            name: "student",
            data: {olympiads_filter: this.state.olympiads_filter, role_filter: this.state.role_filter}
        });
    }

    handleReset() {
        this.setState({
            role: 'all',
            olympiads: [
                0,
                10  //todo close registration if already 10
            ],
        });
        this.props.filterTable({
            name: "student",
            data: {field: this.state.sortName, type: this.state.sortType, role_filter: 'all', olympiads_filter: [0, 10]}
        });
    }

    handleFilterSort() {
        this.props.filterTable({
            name: "student",
            data: {
                field: this.state.sortName,
                type: this.state.sortType,
                role_filter: this.state.role_filter,
                olympiads_filter: this.state.olympiads_filter
            }
        });
    }


    render() {
        return (
            isRole(this.props.role, ["admin"]) ?
                <div className="Student" ref={this.setWrapperRef}>
                    <Form className='filter'>
                        <Form.Item
                            label="Olympiads">
                            <Slider range defaultValue={[0, 100]}
                                    min={0}
                                    max={10}
                                    style={{width: 150}}
                                    value={this.state.olympiads_filter}
                                    onChange={(value) => this.setState({
                                        ["olympiads_filter"]: value

                                    })}/>
                        </Form.Item>
                        <Form.Item
                            label='Role'>
                            <Select defaultValue="all"
                                    style={{width: 120}}
                                    value={this.state.role_filter}
                                    onChange={(value) => this.setState({
                                        ["role_filter"]: value
                                    })}>
                                <Option value="all">All</Option>
                                <Option value="admin">admin</Option>
                                <Option value="Student">student</Option>
                            </Select>
                        </Form.Item>
                        <Button type="primary" onClick={this.handleFilterSort.bind(this)}>Ok</Button>
                        <Button type="primary" onClick={this.handleReset.bind(this)}>Reset</Button>
                    </Form>
                    <h4>Students</h4>
                    {this.createStudentList()}
                    <Button
                        className="edit"
                        hidden={this.props.selectedStudent < 0}
                        onClick={() => this.studentEdit(this.props, "edit")}>
                        edit
                    </Button>
                    <Button
                        className="delete"
                        hidden={this.props.selectedStudent < 0}
                        onClick={() => this.studentEdit(this.props, "delete")}>
                        delete
                    </Button>
                    <div>
                        <StudentEdit type={this.state.sortType} field={this.state.sortName}
                                     getTable={this.props.getTable}/>
                    </div>
                </div>
                : "You don't have permission to be here"
        );
    }
}


const mapStateToProps = function (state) {
    return {
        table: state.studentStore.table,
        selectedStudent: state.studentStore.selectedStudent
    }
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getStudentEdit: actionCreators.getStudentEdit,
        getTable: requestActionCreators.getTable,
        selectStudent: actionCreators.selectStudent,
        deleteTable: requestActionCreators.deleteTable,
        sortTable: sortAction.sortTable,
        filterTable: filterAction.filterTable,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList)
