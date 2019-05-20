import React, {Component} from 'react';
import {Redirect} from 'react-router'

class Verify  extends Component {

    constructor(props) {
        super(props);
        this.props.verifyEmail(this.props.history.location.pathname);
        this.state = {ok : false};
    }

    render() {
        return (
            !this.state.ok ?
            <div id="main">
                    <h3 style={{padding: 15}}>You were verified. Please login</h3>
                    <button
                        onClick={() => this.setState({ok : true})}>
                        Ok
                    </button>
            </div> : <Redirect to="/login"/>
        );
    }
}


export default Verify;
