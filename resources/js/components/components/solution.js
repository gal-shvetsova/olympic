import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as requestActionCreators from '../actions/requestActions';
import {isRole} from "../actions/roleActions";
import {Button} from "antd";

//TODO: hide solve button when it's already solving

export class Solution extends Component {

    constructor(props) {
        super(props);
        const {getTable, id} = this.props;
        this.state = { hide : 1};
        getTable({name: "solution", id: id});
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentWillMount() {
        this.props.getTable({name: "solution", id: this.props.id});
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        this.props.selectTaskToSolve(-1);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.selectTaskToSolve(-1);
        }
    }

    createTaskList() {
        const {table, selectedTask, selectTaskToSolve} = this.props;
        return (
            <table border="1">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Hardness</th>
                    <th>Time</th>
                    <th>Your score</th>
                    <th>Max score</th>
                </tr>
                {
                    table &&
                    table.map((task) => (<tr key={task.id} className={task.id === selectedTask ? "selected" : ""}
                                             onClick={this.taskSelected(task.id, selectTaskToSolve)}>
                        <td className="name"> {task.name} </td>
                        <td className="description"> {task.description} </td>
                        <td className="hardness"> {task.hardness} </td>
                        <td className="time"> {task.time} </td>
                        <td className="your_score"> {task.score < 0 ? task.status : task.score} </td>
                        <td className="max_score"> {task.max_score} </td>
                    </tr>))
                }
                </tbody>
            </table>
        )
    }

    taskSelected(ID, selectTaskToSolve) {
        return () => {
            selectTaskToSolve(ID);
        };
    }

    hidden () {
        const {table, selectedTask} = this.props;
        if (selectedTask < 0) return 1;

        if (!table) return 1;

        const element = table.find(x => x.id === selectedTask);
        if (element['status'] !== 'not started') return 1;

        return 0;
    }

    handleSolve() {
        const {selectedTask} = this.props;
        this.props.history.push("/solution/" + selectedTask + "/edit");
    }

    render() {
        return (isRole(this.props.role, ["participant"]) ?
                <div className="Solution" ref={this.setWrapperRef}>
                    <h4>Tasks</h4>
                    <div className="solutionList">
                        {this.createTaskList()}
                        <div>
                            {
                                !this.hidden() &&
                                <Button className="solve"
                                        onClick={() => this.handleSolve()}
                                >solve
                                </Button>
                            }
                        </div>
                    </div>
                </div> : "You don't have permissions"
        );
    }

}

const mapStateToProps = function (state) {
    return {
        table: state.solutionStore.table,
        selectedTask: state.solutionStore.selectedTask,
    }
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getTable: requestActionCreators.getTable,
        selectTaskToSolve: actionCreators.selectTaskToSolve,
    }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(Solution)
