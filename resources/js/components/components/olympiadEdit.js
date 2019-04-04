import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export class OlympiadEdit extends Component {

    handleChange(field) {
        const {olympiad, getOlympiadEdit} = this.props;

        return (event) => {
            let today = new Date();
            let date = new Date(event.target.value.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1'));
            if (field == "hardness" && (event.target.value  > 10 || event.target.value < 0))
                return;

            if (field == "deadline" && (date < today || date > today.setMonth(today.getMonth() +  1)))
                return;
                const change = {};
                change[field] = event.target.value;
                getOlympiadEdit(Object.assign({}, olympiad, change), true);

        };
    }

    handleSubmit() {
        const {olympiad, getOlympiad} = this.props;
        const method = olympiad.id ? "PUT" : "POST";
        fetch('api/olympiad/', {
            method,
            body: JSON.stringify(olympiad)
        })
            .then(function (response) {
                if (response.ok) {
                    fetch('api/olympiad/')
                        .then(function (response) {
                            if (response.ok) {
                                response.json()
                                    .then(v => getOlympiad(v));
                            } else {
                                response.json()
                                    .then(data => alert(data.error));
                            }
                        })
                } else {
                    response.json()
                        .then(data => alert(data.error));
                }
            });
        this.hide();
    }

    hide() {
        this.props.getOlympiadEdit({}, false);
    }

    render() {
        const olympiad = this.props.olympiad;
        return (
            this.props.show ?
                <div className="olympiadEdit">
                    <p>Name</p>
                    <input type="text" value={olympiad.name || ""} onChange={this.handleChange("name")}/>
                    <p>Hardness</p>
                    <input type="number" min = "1" max = "10" value={olympiad.hardness || ""} onChange={this.handleChange("hardness")}/>
                    <p>Deadline</p>
                    <input type="date" value={olympiad.deadline || ""} onChange={this.handleChange("deadline")}/>
                    <p/>
                    <button type="text" className="ok" onClick={this.handleSubmit.bind(this)}>ok</button>
                    <button className="cancel" onClick={this.hide.bind(this)}>cancel</button>
                </div>
                : "");
    }

}


const mapStateToProps = function (state) {
    return {
        olympiad: state.olympiadEditStore.olympiad,
        show: state.olympiadEditStore.show,
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getOlympiadEdit: actionCreators.getOlympiadEdit,
        getOlympiad: actionCreators.getOlympiad,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(OlympiadEdit)
