import React, {Component} from 'react';
import * as actionCreators from '../actions/index.js';
import * as requestActionCreators from '../actions/requestActions';
import * as sortAction from '../actions/sortAction'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import OlympiadEdit from "./olympiadEdit";
import {isRole} from "../actions/roleActions";

export class OlympiadList extends Component {


    constructor(props) {
        super(props);
        const getTable = this.props.getTable;
        getTable({name: "olympiad"});
        this.state = {
            sortName : "id",
            sortType : 'asc'
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    createOlympiadList() {
        const {table, selectedOlympiad} = this.props;
        return table ?
            (
                <table border="1">
                    <tbody>
                    <tr>
                        <th onClick={() => this.handleSort("name")}>Name</th>
                        <th onClick={() => this.handleSort("hardness")}>Hardness</th>
                        <th onClick={() => this.handleSort("deadline")}>Deadline</th>
                        <th onClick={() => this.handleSort("participants")}>Participants</th>
                    </tr>
                    {
                        table.map((olympiad) => (
                            <tr key={olympiad.id} className={olympiad.id === selectedOlympiad ? "selected" : ""}
                                onClick={this.olympiadSelected(olympiad.id)}>
                                <td className="name"> {olympiad.name} </td>
                                <td className="hardness"> {olympiad.hardness} </td>
                                <td className="deadline"> {olympiad.deadline} </td>
                                <td className="participants"> {olympiad.participants} </td>
                            </tr>))
                    }
                    </tbody>
                </table>
            ) : "Empty olympiad's list";
    }

    handleSort(name) {
        this.setState({
            sortName : name,
            sortType : this.state.sortType === 'asc' ? 'desc' : 'asc'
        });
        const type = this.state.sortType === 'asc' ? 'desc' : 'asc';
        this.props.sortTable({name : "olympiad", data : {type : type, field : name}});
    }

    handleDelete(olympiad) {
        const {deleteTable} = this.props;
        deleteTable({name: "olympiad", id: olympiad, type : this.state.sortType, field : this.state.sortName});
    }

    olympiadEdit(props, button) {
        props.getOlympiadEdit({}, false);
        if (button != "edit" || props.selectedOlympiad != -1) {
            const olympiad = props.table.find(v => v.id === props.selectedOlympiad) || {};
            props.getOlympiadEdit(olympiad, true);
        }
        if (button == "add") {
            props.getOlympiadEdit({}, true);
        }
        if (button == "delete") {
            this.handleDelete(props.selectedOlympiad);
            props.getOlympiadEdit({}, false);
        }
    }

    olympiadSelected(OLYMPIAD_ID) {
        return () => {
            this.props.getOlympiadEdit({}, false);
            this.props.selectOlympiad(OLYMPIAD_ID);
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const olympiadEdit = document.getElementsByClassName("olympiadEdit")[0];
        const join = document.getElementsByClassName("join")[0];
        if (!event.path.includes(olympiadEdit) && !event.path.includes(join)) {
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.props.selectOlympiad(-1);
                this.props.getOlympiadEdit({}, false);
            }
        }
    }

    handleToTask(id) {
        this.props.history.push("task/" + id);
    }

    render() {
        return ( !isRole(this.props.role, ["participant"]) ?
            <div className="Olympiad" ref={this.setWrapperRef}>
                <h4>Olympiad</h4>
                {this.createOlympiadList()}
                {
                    isRole(this.props.role, ["admin"]) &&
                    <button
                        className="add"
                        onClick={() => this.olympiadEdit(this.props, "add")}>
                        add
                    </button>
                }
                {
                    isRole(this.props.role, ["admin"]) &&
                    <button
                        className="edit"
                        hidden={this.props.selectedOlympiad < 0}
                        onClick={() => this.olympiadEdit(this.props, "edit")}>
                        edit
                    </button>
                }
                {
                    isRole(this.props.role, ["admin"]) &&
                    <button
                        className="delete"
                        hidden={this.props.selectedOlympiad < 0}
                        onClick={() => this.olympiadEdit(this.props, "delete")}>
                        delete
                    </button>
                }
                {
                    isRole(this.props.role, ["admin"]) &&
                    <button
                        hidden={this.props.selectedOlympiad < 0}
                        onClick={() => this.handleToTask(this.props.selectedOlympiad)}>
                        to tasks
                    </button>
                }

                {
                    isRole(this.props.role, ["student"]) &&
                    <button
                        className="join"
                        hidden={this.props.selectedOlympiad < 0}
                        onClick={() => this.props.history.push("/join")}>
                        join
                    </button>
                }
                <OlympiadEdit type={this.state.sortType} field={this.state.sortName} getTable={this.props.getTable}/>
            </div> : "You don't have permissions"
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        table : state.olympiadStore.table,
        selectedOlympiad: state.olympiadStore.selectedOlympiad,
        ownProps
    }
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getStateOlympiad: actionCreators.getStateOlympiad,
        getOlympiadEdit: actionCreators.getOlympiadEdit,
        getTable: requestActionCreators.getTable,
        selectOlympiad: actionCreators.selectOlympiad,
        deleteTable: requestActionCreators.deleteTable,
        sortTable : sortAction.sortTable
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(OlympiadList)
