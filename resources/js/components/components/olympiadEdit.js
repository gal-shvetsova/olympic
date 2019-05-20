import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as requestActionCreators from '../actions/requestActions';

export class OlympiadEdit extends Component {

    handleChange(field) {
        const {table, getOlympiadEdit} = this.props;

        return (event) => {
            let today = new Date();
            let date = new Date(event.target.value.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1'));
            if (field == "hardness" && (event.target.value  > 10 || event.target.value < 0))
                return;

            if (field == "deadline" && (date < today || date > today.setMonth(today.getMonth() +  1)))
                return;
                const change = {};
                change[field] = event.target.value;
                getOlympiadEdit(Object.assign({}, table, change), true);

        };
    }

    handleSubmit() {
        const {table, postTable} = this.props;
        let data = table;
        data['type'] = this.props.type;
        data['field'] = this.props.field;
        data = JSON.stringify(data);
        if (!table.id)
            postTable({name: "olympiad", data : data, method : "POST"});
        else
            postTable({name: "olympiad", data : data, method : "PUT", id : table.id});
        this.hide();
    }

    hide() {
        this.props.getOlympiadEdit({}, false);
    }

    render() {
        const table = this.props.table;
        return (
            this.props.show ?
                <div className="olympiadEdit">
                    <p>Name</p>
                    <input type="text" value={table.name || ""} onChange={this.handleChange("name")}/>
                    <p>Hardness</p>
                    <input type="number" min = "1" max = "10" value={table.hardness || ""} onChange={this.handleChange("hardness")}/>
                    <p>Deadline</p>
                    <input type="date" value={table.deadline || ""} onChange={this.handleChange("deadline")}/>
                    <p/>
                    <button type="text" className="ok" onClick={this.handleSubmit.bind(this)}>ok</button>
                    <button className="cancel" onClick={this.hide.bind(this)}>cancel</button>
                </div>
                : "");
    }

}


const mapStateToProps = function (state) {
    return {
        table: state.olympiadEditStore.table,
        show: state.olympiadEditStore.show,
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getOlympiadEdit: actionCreators.getOlympiadEdit,
        postTable: requestActionCreators.postTable
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(OlympiadEdit)
