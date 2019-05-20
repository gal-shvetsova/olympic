import React, {Component} from 'react';
import {isRole} from "../actions/roleActions";
import io from 'socket.io-client';
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from "axios";

export class Queue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            table: [],
        };
        this.socket = '';
    }


    getTable() {
        let host = window.location.hostname;
        const doRequest = axios.get('http://' + host + '/api/queue/' + this.props.id + '/');
        doRequest.then(
            (res) => {
                this.setState({
                    table: res.data.table
                });
            }
        );
    }



    componentDidMount() {
        this.socket = io('http://olympic.test:8000'); //TODO remove hardcode
        this.socket.on(
            'timer',
            this.getTable.bind(this)
        );

        this.socket.open();
        this.socket.emit('subscribeToTimer', 1000, this.props.id);
    }

    componentWillUnmount() {
        this.socket.close();
    }

    createQueue(table) {
        return table !== undefined ? (
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
                        <td className="progress">
                            <ProgressBar now={task.progress} label={`${task.progress}%`} isChild={true} />
                        </td>
                        <td className="score"> {task.score > 0 ? task.score : "Checking"} </td>
                        <td className="max_score"> {task.max_score} </td>
                    </tr>))
                }
                </tbody>
            </table>
        ) : <p>Loading</p>
    }

    render() {
        return (isRole(this.props.role, ["participant"]) ?
                <div className="Queue">
                    <h4>Queue</h4>
                    {this.createQueue(this.state.table)}
                </div> : "You don't have permissions"
        );
    }

}

export default Queue
