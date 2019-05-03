import React, {Component} from 'react';
import {isRole} from "../actions/roleActions";
import {bindActionCreators} from "redux";
import * as requestActionCreators from "../actions/requestActions";
import {connect} from "react-redux";

export class Queue extends Component {

    constructor(props) {
        super(props);
        const {getTable, id} = this.props;
        getTable({name: "queue", id: id});
    }

    createQueue() {
        const {table} = this.props;
        return (
            <table border="1">
                <tbody>
                <tr>
                    <th>Task</th>
                    <th>Progress</th>
                    <th>Your score</th>
                    <th>Max score</th>
                </tr>
                {
                    table.map((task) => (<tr key={task.id}>
                        <td className="name"> {task.name} </td>
                        <td className="progress"> {task.progress} </td>
                        <td className="score"> {task.score} </td>
                        <td className="max_score"> {task.max_score} </td>
                    </tr>))
                }
                </tbody>
            </table>
        )
    }

    render() {
        return (isRole(this.props.role, ["participant"]) ?
                <div className="Queue">
                    <h4>Queue</h4>
                        {this.createQueue()}
                </div> : "You don't have permissions"
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        table: state.queueStore.table,
        ownProps
    }
};


const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getTable: requestActionCreators.getTable
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Queue)
