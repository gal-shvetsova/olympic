import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as requestActionCreators from "../actions/requestActions";

export  class SEdit extends Component {

  handleChange(field) {
    const {user, getUserEdit } = this.props;
    //    this.props.getTaskEdit({}, -1, false);
    return (event) => {
      const change = {};
      change[field] = event.target.value;
      getUserEdit(Object.assign({},user,change), true);
    };
  }

  handleSubmit() {
    const {table, postTable, getTable} = this.props;
    if (table.id)
      postTable({name: "user", data : JSON.stringify(table), method : "PUT"}).then(getTable({name: "user"}));
    else
      postTable({name: "user", data : JSON.stringify(table), method : "POST", put_id : table.id}).then(getTable({name: "user"}));
    this.hide();
  }

  hide() {
      this.props.getUserEdit({},false);
  }

  render() {
    const user = this.props.user;
      return (
      this.props.show ?
      <div className = "userEdit">
        <p>Last name</p>
        <input  type="text"  value={user.last_name || ""}  onChange={this.handleChange("last_name")}/>
        <p>Role</p>
        <select value={user.user_role || ""}  onChange={this.handleChange("user_role")}>
          <option value="admin">admin</option>
          <option value="student">student</option>
        </select>
        <p></p>
        <button  type="text"   className="ok" onClick={this.handleSubmit.bind(this)}>ok</button> 
        <button className="cancel" onClick={this.hide.bind(this)}>cancel</button> 
      </div>
      : "");
  }
  
}



const mapStateToProps = function(state){
  return {
    user: state.userEditStore.user,
    show : state.userEditStore.show,
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    getUserEdit : actionCreators.getUserEdit,
    getTaskEdit : actionCreators.getTaskEdit,
    postTable: requestActionCreators.postTable,
    deleteTable : requestActionCreators.deleteTable
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
