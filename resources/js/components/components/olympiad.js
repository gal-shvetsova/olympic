import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';

export class OlympiadList extends Component {

    constructor(props) {
        super(props);
        const getOlympiad = this.props.getOlympiad;
        fetch('api/olympiad/')
            .then(function(response){
                if (response.ok) {
                    response.json().then(v => getOlympiad(v));
                }
                else {
                    response.json()
                        .then(function(data){
                            alert(data.error);
                        })
                }
            })
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
        const {olympiads, selectedOlympiad} = this.props;
        return olympiads ?
            (
                <table border = "1">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Hardness</th>
                        <th>Deadline</th>
                        <th>Participants</th>
                    </tr>
                    {
                        olympiads.map((olympiad) => (
                            <tr key = {olympiad.id} className = {olympiad.id === selectedOlympiad ? "selected" : ""}
                                onClick = {this.olympiadSelected(olympiad.id)}>
                                <td className = "name"> {olympiad.name} </td>
                                <td className ="hardness"> {olympiad.hardness} </td>
                                <td className = "deadline"> {olympiad.deadline} </td>
                                <td className = "participants"> {olympiad.participants} </td>
                            </tr>))
                    }
                    </tbody>
                </table>
            ) : "Empty olympiad's list";
    }

    handleDelete(olympiad) {
        const {getOlympiad} = this.props;
        fetch('api/olympiad/', {
            method : "DELETE",
            body : JSON.stringify(olympiad)
        })
            .then(function(response) {
                if (response.ok) {
                    fetch('api/olympiad/')
                        .then(response => response.json())
                        .then(v => getOlympiad(v));
                } else {
                    response.json()
                        .then(data => alert(data.error));
                }
            });
    }

    olympiadEdit(props,button){
        props.getOlympiadEdit({}, false);
        if (button  != "edit" || props.selectedOlympiad != -1){
            const olympiad = props.olympiads.find(v=>v.id === props.selectedOlympiad) || {};
            props.getOlympiadEdit(olympiad, true);
        }
        if (button == "add") {
            props.getOlympiadEdit({}, true);
        }
        if (button == "delete") {
            const olympiad = props.olympiads.find(v=>v.id === props.selectedOlympiad) || {};
            this.handleDelete(olympiad);
            props.getOlympiadEdit({}, false);
        }
    }

    olympiadSelected(OLYMPIAD_ID){
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

        if (!event.path.includes(olympiadEdit)) {
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.props.selectOlympiad(-1);
                this.props.getOlympiadEdit({}, false);
            }
        }
    }

    handleToTask(id) {
        window.location.href ="http://olympic.test/task/"+ id;
    }

    render() {
        return (
            <div className="Olympiad" ref={this.setWrapperRef}>
                <h4>Olympiad</h4>
                {this.createOlympiadList()}
                <button className="add" onClick={() => this.olympiadEdit(this.props, "add")}>add</button>
                <button className="edit" onClick={() => this.olympiadEdit(this.props, "edit")}>edit</button>
                <button className="delete" onClick={() => this.olympiadEdit(this.props, "delete")}>delete</button>
                <button className = {this.props.selectedOlympiad != -1 ? "show" : "hidden"} onClick={() => this.handleToTask(this.props.selectedOlympiad)} >to tasks</button>
            </div>
        );
    }
}


const mapStateToProps = function(state){
    return {
        olympiads: state.olympiadStore.olympiads,
        selectedOlympiad : state.olympiadStore.selectedOlympiad
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getOlympiadEdit : actionCreators.getOlympiadEdit,
        getOlympiad : actionCreators.getOlympiad,
        selectOlympiad : actionCreators.selectOlympiad,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OlympiadList)
