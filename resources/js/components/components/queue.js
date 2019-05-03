import React, {Component} from 'react';
import {isRole} from "../actions/roleActions";
import {bindActionCreators} from "redux";
import * as requestActionCreators from "../actions/requestActions";
import {connect} from "react-redux";
import io from 'socket.io-client';

export class Queue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            table: [],
        };
        this.socket = '';
       // const {getTable, id} = this.props;
        //getTable({name: "queue", id: id});
    }

    componentDidMount() {
        this.socket = io('http://olympic.test:8000'); //TODO remove hardcode
        this.socket.on(
            'timer',
            data =>
                this.setState(
                    { table: data },
                    // the second parameter to setState will be called on completion, so you'll log every time the speed changes
                    () => console.log("got the speed: " + JSON.stringify(this.state.table))
                )
        );

        this.socket.open();

        this.socket.emit('subscribeToTimer', 1000, this.props.id);

       // document.getElementsByClassName("Queue")[0].insertAdjacentElement(this.createQueue());
    }

    componentWillUnmount() {
        this.socket.close();
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
                        <h4>This is the timer value: {this.state.timestamp}</h4>
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
