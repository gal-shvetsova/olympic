import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';

export class MainTable extends Component {

  constructor(props) {
    super(props);
    const getConformity = this.props.getConformity;
    fetch('main/')
    .then(response => response.json())
    .then(v => getConformity(v));
  }

  render() {
    const conformity = this.props.conformity;
     return (
      <div className="MainTable">
        <h4>Main Table</h4>
        <table border = "1">
        <tbody>
          <tr>
            <th>Last name</th>
            <th>Tasks</th>
          </tr>
            { 
              conformity.map((conf, index) => (
                <tr key = {index}>  
                  <td className = "lastname"> {conf.LAST_NAME} </td>
                  <td className ="tasks"> {conf.TASKS} </td>
                </tr>))
              }
        </tbody>
      </table>
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    conformity: state.mainTableStore.conformity,
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    getConformity : actionCreators.getConformity,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTable)

