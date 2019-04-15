import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';
import UserEdit from './userEdit';
import OlympiadEdit from "./olympiad";
import * as requestActionCreators from '../actions/requestActions';

export class UserList extends Component {

    constructor(props) {
        super(props);
        this.props.getTable({name: "user"});

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    createUserList() {
        const {table, selectedUser} = this.props;
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
                        table.map((user) => (
                            <tr key={user.id} className={user.id === selectedUser ? "selected" : ""}
                                onClick={this.userSelected(user.id)}>
                                <td className="name"> {user.last_name} </td>
                                <td className="role"> {user.user_role} </td>
                                <td className="olympiads"> {user.olympiads} </td>
                            </tr>))
                    }
                    </tbody>
                </table>
            ) : "Empty user's list";
    }

    handleDelete(user) {  //find in olympiads table and delete
        const {deleteTable, getTable} = this.props;
        deleteTable({name : "user", data : user});//.then(getTable({name : "olympiad"}));
    }

    userEdit(props, button) {
        props.getUserEdit({}, false);
        if (button != "edit" || props.selectedUser != -1) {
            const user = props.table.find(v => v.id === props.selectedUser) || {};
            props.getUserEdit(user, true);
        }
        if (button == "add") {
            props.getUserEdit({}, true);
        }
        if (button == "delete") {
            this.handleDelete(props.selectedUser);
            props.getUserEdit({}, false);
        }
    }

    userSelected(USER_ID) {
        return () => {
            this.props.getUserEdit({}, false);
            this.props.selectUser(USER_ID);
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const userEdit = document.getElementsByClassName("userEdit")[0];

        if (!event.path.includes(userEdit)) {
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.props.selectUser(-1);
                this.props.getUserEdit({}, false);
            }
        }
    }

    render() {
        return (
            <div className="User" ref={this.setWrapperRef}>
                <h4>Users</h4>
                {this.createUserList()}
                <button className="add" onClick={() => this.userEdit(this.props, "add")}>add</button>
                <button className="edit" onClick={() => this.userEdit(this.props, "edit")}>edit</button>
                <button className="delete" onClick={() => this.userEdit(this.props, "delete")}>delete</button>
                <div>
                    <UserEdit  getTable = {this.props.getTable}/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = function (state) {
    return {
        table: state.userStore.table,
        selectedUser: state.userStore.selectedUser
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getUserEdit: actionCreators.getUserEdit,
        getTable: requestActionCreators.getTable,
        selectUser: actionCreators.selectUser,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
