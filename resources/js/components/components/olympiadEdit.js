import React, {Component} from 'react';
import * as actionCreators from '../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as requestActionCreators from '../actions/requestActions';

export class OlympiadEdit extends Component {

    handleChange() {
        return (e) => {
            e.preventDefault();
            const name = e.target.name;
            const value = e.target.value;
            let today = new Date();
            let date = new Date(value.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1'));
            if (name === "hardness" && (value > 10 || value < 0))
                return;
            if (name === "deadline" && (date < today || date > today.setMonth(today.getMonth() + 1)))
                return;
            this.props.getOlympiadEdit(Object.assign({}, this.props.table, {[name]: value}), true)
        }
    }

    handleSubmit() {
        const {table, postTable} = this.props;
        let data = table;
        data['type'] = this.props.type;
        data['field'] = this.props.field;
        data = JSON.stringify(data);
        if (!table.id)
            postTable({name: "olympiad", data: data, method: "POST"});
        else
            postTable({name: "olympiad", data: data, method: "PUT", id: table.id});
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
                    <form className="form">
                        <div className={`form-group`}>
                            <label htmlFor="name">Name</label>
                            <input type="text" required className="form-control" name="name"
                                   value={table.name || ""}
                                   onChange={this.handleChange()}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="hardness">Hardness</label>
                            <input type="number" className="form-control" name="hardness"
                                   value={table.hardness || ""}
                                   onChange={this.handleChange()}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="deadline">Deadline</label>
                            <input type="date" className="form-control" name="deadline"
                                   value={table.deadline || ""}
                                   onChange={this.handleChange()}/>
                        </div>
                        <button type="button" className="btn btn-primary" disabled={!(table.name && table.hardness && table.deadline)}
                                onClick={this.handleSubmit.bind(this)}>Ok
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.hide.bind(this)}>Cancel</button>
                    </form>
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
