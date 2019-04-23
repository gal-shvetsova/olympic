import React, {Component} from 'react';
import * as actionCreators from '../actions/index.js';
import * as requestActionCreators from '../actions/requestActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import OlympiadEdit from "./olympiadEdit";
import {hasRole, isRole} from "../actions/roleActions";

export class OlympiadList extends Component {

    constructor(props) {
        super(props);
        const getTable = this.props.getTable;
        getTable({name: "olympiad"});
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
                        <th>Name</th>
                        <th>Hardness</th>
                        <th>Deadline</th>
                        <th>Participants</th>
                    </tr>
                    {
                        table.map((olympiad) => (
                            <tr key={olympiad.id} className={olympiad.id === selectedOlympiad ? "selected" : ""}
                                onClick={this.olympiadSelected(olympiad.id)}>
                                <td className="name"> {olympiad.name} </td>
                                <td className="hardness"> {olympiad.hardness} </td>
                                <td className="deadline"> {olympiad.deadline} </td>
                                <td className="participants"> {olympiad.students_count} </td>
                            </tr>))
                    }
                    </tbody>
                </table>
            ) : "Empty olympiad's list";
    }

    handleDelete(olympiad) {
        const {deleteTable, getTable} = this.props;
        deleteTable({name: "olympiad", id: olympiad}).then(getTable({name: "olympiad"}));
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
        if (!event.path.includes(olympiadEdit) && !event.path.includes(olympiadEdit)) {
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.props.selectOlympiad(-1);
                this.props.getOlympiadEdit({}, false);
            }
        }
    }

    handleToTask(id) {
        window.location.href = "task/" + id;
    }


    render() {
        return (
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

                }
                <OlympiadEdit getTable={this.props.getTable}/>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        table: state.olympiadStore.table,
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
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(OlympiadList)
