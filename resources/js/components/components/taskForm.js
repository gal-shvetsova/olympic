import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as solvingActions from  '../actions/solvingActions'
import * as requestActionCreators from "../actions/requestActions";
import solution from "./solution";
import Timer from "./timer"
//TODO not to show when time is gone

export class TaskForm extends Component {

    constructor(props) {
        super(props);
        const {getTable } = this.props;
        this.state =
            {
                solutionID : this.props.location.pathname.split('/')[2],
                task: {}
            };
        getTable({name: "solution", id: this.state.solutionID + '/edit'});
    }

    componentWillMount() {
        this.props.getTable({name: "solution", id: this.state.solutionID + '/edit'});
        const task = this.props.table[0];
        task.solution = "";
        this.setState({task : task});
    }

    componentDidMount() {
        if (this.state.task.status !== "solving") {
            const newTask = this.state.task;
            const date = new Date();
            newTask.start = date.toString();
            newTask.status = "solving";
            this.setState({task : newTask});
            this.props.postTable({
                name: "solution",
                method: "PUT",
                data: JSON.stringify(this.state.task),
                id: this.state.solutionID
            });
        }
    }

    handleChange() {
        return (e) => {
            const newTask = this.state.task;
            newTask.solution = e.target.value;
            this.setState({task : newTask});
        };
    }

    handleSubmit() {
            const args = {data : {}};
            args.data.student_id = this.props.id;
            args.data.solution_id = this.state.solutionID;
            args.data.progress = 0;
            args.history = this.props.history;
            this.props.sendSolution(args);
            this.props.history.replace("/queue/" + args.data.student_id);
    }


    render() {
        const {table, selectedTask} = this.props;
        const time = table ? table.find(x => x.id === selectedTask)['time'] : 0;
        return (
            <div className="taskFrom">
                <textarea className="solution" value={this.state.task.solution || ""} onChange={this.handleChange()}>
                        </textarea>
                <Timer start = {new Date(Date.now())} time = {time} onEnd={this.handleSubmit.bind(this)}/>
                <button className="ok" onClick={this.handleSubmit.bind(this)}>ok</button>
            </div>);
    }
}

const mapStateToProps = function (state) {
    return {
        table: state.solutionStore.table,
        selectedTask : state.solutionStore.selectedTask
    }
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        sendSolution: solvingActions.sendSolution,
        getTable : requestActionCreators.getTable,
        postTable: requestActionCreators.postTable,
    }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
