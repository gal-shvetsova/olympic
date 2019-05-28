import React from "react";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import Login from "./login";
import ForgotPassword from "./forgotPassword"
import NewPassword from "./newPassword"
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
import Verify from "./verifyEmail";
import {_verifyEmail} from "../actions/registerAction";
import _forgotPassword from '../actions/forgotPasswordAction'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                isLoggedIn: false,
                user: {role: "guest", id: -1}
            };

    };


    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }
    }

    render() {
        if (this.state.isLoggedIn && (this.props.location.pathname === "/login" || this.props.location.pathname === "/register")) {
            if (isRole(this.state.user.role, ["admin", "guest", "student"])) {
                this.props.history.push("/olympiad");
            } else {
                this.props.history.push("/solution/" + this.state.user.id);
            }
        }

        return (


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
                        path="/register/confirm/:token/"
                        render={props => (<Verify {...props} verifyEmail={_verifyEmail.bind(this)}/>)}
                    />

                    {
                        this.props.history.location.pathname === '/register' &&
                        <Route
                            path="/register/"
                            render={props => (
                                <Register {...props} registerUser={registerActionCreators._registerUser.bind(this)}/>)}
                        />
                    }

                    <Route
                        path="/password/reset"
                        render={props => (<ForgotPassword {...props} forgotPassword={_forgotPassword.bind(this)}/>)}
                    />

                    <Route
                        path="/password/reset/:token"
                        render={(props) => (<NewPassword {...props} email = {this.props.user.email}/>)}
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
                        render={(props) => <TaskList {...props} olympiad_id={this.props.olympiad_id}
                                                     role={this.state.user.role}/>}
                    />

                    <Route
                        path="/solution/:id/"
                        render={props => (
                            <Solution student_id={this.state.user.id} role={this.state.user.role} {...props}/>)}
                    />


                    <Route
                        path="/solution/:id/edit"
                        render={props => (<TaskForm id={this.state.user.id} {...props}/>)}
                    />

                    <Route
                        path="/queue/:id/"
                        render={props => (<Queue id={this.state.user.id} role={this.state.user.role}{...props}/>)}
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
                                <ResetPassword {...props} email={this.state.user.email}
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