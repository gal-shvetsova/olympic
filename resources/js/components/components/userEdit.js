import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export  class UserEdit extends Component {

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
    const {user, getUser} = this.props;
    const method = user.id ?  "PUT" : "POST";
    fetch('api/user/', {
      method,
      body : JSON.stringify(user)})
      .then(function(response) {
        if (response.ok) {
          fetch('api/user/')
          .then(function(response){ 
            if (response.ok){ 
              response.json()
              .then(v => getUser(v));
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
    getUser : actionCreators.getUser,
    getConformity : actionCreators.getConformity
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
