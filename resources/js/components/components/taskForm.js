import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as solvingActions from  '../actions/solvingActions'
import * as requestActionCreators from "../actions/requestActions";
import solution from "./solution";

//TODO not to show when time is gone

export class TaskForm extends Component {

    constructor(props) {
        super(props);
        const {getTable, postTable } = this.props;
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
            console.log(JSON.stringify(this.state.task));
            const newTask = this.state.task;
            const date = new Date();
            newTask.start = date.toString();
            newTask.status = "solving";
            this.setState({task : newTask});
            console.log(JSON.stringify(this.state.task));
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
            const args = {};
            args.data.student_id = this.props.id;
            args.data.solution_id = this.state.solutionID;
            args.data.progress = 0;
            args.history = this.props.history;
            this.props.sendSolution(args);
    }


    render() {
        return (
            <div className="taskFrom">
                <textarea className="solution" value={this.state.task.solution || ""} onChange={this.handleChange()}>
                        </textarea>
                <button className="ok" onClick={this.handleSubmit.bind(this)}>ok</button>
                <button className="back"
                        onClick={() => this.props.history.push("/solution/" + this.props.id)}>back
                </button>
            </div>);
    }
}

const mapStateToProps = function (state) {
    return {
        table: state.solutionStore.table,
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
