import React from "react";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Queue from "./queue"
import {_loginUser, _logoutUser} from "../actions/loginActions";
import * as registerActionCreators from "../actions/registerAction";
import {_resetPassword} from "../actions/resetPasswordAction"
import {isRole} from "../actions/roleActions";
import OlympiadList from "./olympiad";
import StudentList from "./student";
import TaskList from "./task";
import TaskForm from "./taskForm"
import Join from "./join";
import {applyMiddleware, createStore} from "redux";
import {connect} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import ResetPassword from "./resetPassword";
import Solution from "./solution";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                isLoggedIn: false,
                user: {role: "guest", id: -1}
            };

    };

    componentWillUpdate() {

    }

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }
    }

    render() {
        if (this.state.isLoggedIn && (this.props.location.pathname === "/login" || this.props.location.pathname === "/register"))
        {
            if (isRole(this.state.user.role, ["admin", "guest", "student"])) {
                this.props.history.push("/olympiad");
            }
            else {
                this.props.history.push("/solution/" + this.state.user.id);
            }
        }
        if (!this.state.isLoggedIn &&
            this.props.location.pathname !== "/login" &&
            this.props.location.pathname !== "/register" &&
            this.props.location.pathname !== "/olympiad")
        {
            this.props.history.push("/login");
        }
        return (

            <Switch data="data">
                <div id="main">
                    {
                        isRole(this.state.user.role, ["admin"]) &&
                        <Link to="/student">Student</Link>
                    }
                    {
                        !isRole(this.state.user.role, ["participant"]) &&
                        <Link to="/olympiad">Olympiad </Link>
                    }

                    {
                        isRole(this.state.user.role, ["participant"]) &&
                        <Link to={"/queue/" + this.state.user.id}>Queue</Link>
                    }
                    {
                        isRole(this.state.user.role, ["participant"]) &&
                        <Link to={"/solution/" + this.state.user.id}>Your tasks</Link>
                    }

                    <Route
                        path="/login"
                        render={props => (<Login {...props} loginUser={_loginUser.bind(this)}/>)}
                    />

                    <Route
                        path="/register"
                        render={props => (
                            <Register {...props} registerUser={registerActionCreators._registerUser.bind(this)}/>)}
                    />

                    <Route
                        path="/join"
                        render={props => (<Join {...props}
                                                olympiad_id={this.props.olympiad_id}
                                                student_id={this.state.user.id}
                                                registerParticipant={registerActionCreators._registerParticipant.bind(this)}/>)}
                    />

                    <Route
                        path="/olympiad"
                        render={props => <OlympiadList {...props}
                                                       role={this.state.user.role}/>}
                    />

                    <Route
                        path="/student"
                        render={() => <StudentList role={this.state.user.role}/>}
                    />
                    <Route
                        path="/task/:id"
                        render={(props) => <TaskList {...props}  olympiad_id={this.props.olympiad_id} role={this.state.user.role}/>}
                    />

                    <Route
                        path="/solution/:id/"
                        render={props => (<Solution student_id = {this.state.user.id} role = {this.state.user.role} {...props}/>)}
                    />

                    <Route
                        path="/solution/:id/edit"
                        render={props => (<TaskForm id = {this.state.user.id} {...props}/>)}
                    />

                    <Route
                        path="/queue/:id"
                        render={props => (<Queue id = {this.state.user.id} role = {this.state.user.role}{...props}/>)}
                    />

                    {
                        isRole(this.state.user.role, ["admin", "participant", "student"]) &&
                        <button onClick={_logoutUser.bind(this)}>Logout</button>

                    }

                    {
                        isRole(this.state.user.role, ["participant", "student", "admin"]) &&
                        <Route
                            path="/password"
                            render={props => (
                                <ResetPassword {...props} auth_token={this.state.user.auth_token}
                                               resetPassword={_resetPassword.bind(this)}/>)}
                        />
                    }

                    {
                        isRole(this.state.user.role, ["participant", "student", "admin"]) &&
                        <button onClick={() => this.props.history.replace("password")}>Reset password</button>
                    }

                    {
                        isRole(this.state.user.role, ["student"]) &&
                        <button onClick={registerActionCreators._deleteAccount.bind(this)}>Delete account</button>
                    }

                    {
                        isRole(this.state.user.role, ["guest"]) &&
                        this.props.location.pathname !== "/register" &&
                        <Link to="/register">
                            Register
                        </Link>
                    }
                    {
                        isRole(this.state.user.role, ["guest"]) &&
                        this.props.location.pathname !== "/login" &&
                        <Link to="/login">
                            Login
                        </Link>
                    }
                </div>
            </Switch>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        olympiad_id: state.olympiadStore.selectedOlympiad,
        ownProps
    }
};
const AppContainer = withRouter((props) => (
    <App {...props} store={createStore(composeWithDevTools(applyMiddleware(thunk)))}/>));

export default connect(mapStateToProps)(AppContainer)