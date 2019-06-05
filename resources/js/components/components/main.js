import React from "react";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import Login from "./login";
import ForgotPassword from "./forgotPassword"
import Register from "./register";
import Queue from "./queue"
import {_loginUser, _logoutUser} from "../actions/loginActions";
import * as registerActionCreators from "../actions/registerAction";
import {_verifyEmail} from "../actions/registerAction";
import {_resetPassword} from "../actions/resetPasswordAction"
import {_forgotPassword} from "../actions/forgotPasswordAction"
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
import {Layout, Menu, message} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider, Icon} = Layout;

message.config({
    top: 100,
    duration: 4,
    maxCount: 1,
});

class App extends React.Component {
    constructor(props) {
        super(props);
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.state = {isLoggedIn: AppState.isLoggedIn, user: AppState.user, error: {message: '', type: ''}};
        }
    };


    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user, error: {message: '', type: ''}});
        }
    }

    onClose() {
        return (e) => {
            this.setState({error: {message: '', type: ''}});
            e.preventDefault();
            console.log(e);
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
            this.state.user ? (
                <Layout>
                    <Header className="header">
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{lineHeight: '64px'}}
                        >
                            <SubMenu key="sub1" title="Account">
                                {
                                    isRole(this.state.user.role, ["guest"]) &&
                                    <Menu.Item key="login"><Link to={'login'}>Login</Link></Menu.Item>
                                }
                                {
                                    isRole(this.state.user.role, ["guest"]) &&
                                    <Menu.Item key="register"><Link to={'/register'}>Register</Link></Menu.Item>
                                }
                                {
                                    isRole(this.state.user.role, ["admin", "student", "participant"]) &&
                                    <Menu.Item key="reset"><Link to={'/password'}>Reset password</Link></Menu.Item>
                                }
                                {
                                    isRole(this.state.user.role, ["admin", "student", "participant"]) &&
                                    <Menu.Item key="delete">Delete account</Menu.Item>
                                }
                                {
                                    isRole(this.state.user.role, ["admin", "student", "participant"]) &&
                                    <Menu.Item key="logout" onClick={_logoutUser.bind(this)}>Logout</Menu.Item>
                                }

                            </SubMenu>
                            {
                                isRole(this.state.user.role, ["admin"]) &&
                                <Menu.Item><Link to="/student">Student</Link></Menu.Item>
                            }
                            {
                                isRole(this.state.user.role, ["admin", "guest"]) &&
                                <Menu.Item><Link to="/olympiad">Olympiad</Link></Menu.Item>
                            }
                            {
                                isRole(this.state.user.role, ["participant"]) &&
                                <Menu.Item><Link to={"/queue/" + this.state.user.id}>Queue</Link></Menu.Item>
                            }
                            {
                                isRole(this.state.user.role, ["participant"]) &&
                                <Menu.Item><Link to={"/solution/" + this.state.user.id}>Your tasks</Link></Menu.Item>
                            }
                        </Menu>
                    </Header>
                    <Layout>
                        <Content style={{padding: '0 50px'}}>
                            <Switch>

                                <Route
                                    path="/login"
                                    render={props => (<Login {...props} loginUser={_loginUser.bind(this)}/>)}
                                />

                                <Route
                                    path="/register/confirm/:token/"
                                    render={props => (<Verify {...props} verifyEmail={_verifyEmail.bind(this)}/>)}
                                />

                                <Route
                                    path="/register/"
                                    render={props => (
                                        <Register {...props}
                                                  registerUser={registerActionCreators._registerUser.bind(this)}/>)}
                                />

                                <Route
                                    path="/password/reset"
                                    render={props => (
                                        <ForgotPassword {...props} forgotPassword={_forgotPassword.bind(this)}/>)}
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
                                    path="/solution/:id/edit"
                                    render={props => (<TaskForm id={this.state.user.id} {...props}/>)}
                                />

                                <Route
                                    path="/solution/:id/"
                                    render={props => (
                                        <Solution id={this.state.user.id} role={this.state.user.role} {...props}/>)}
                                />

                                <Route
                                    path="/queue/:id/"
                                    render={props => (
                                        <Queue id={this.state.user.id} role={this.state.user.role}{...props}/>)}
                                />
                            </Switch>

                            {
                                isRole(this.state.user.role, ["participant", "student", "admin"]) &&
                                <Route
                                    path="/password"
                                    render={props => (
                                        <ResetPassword {...props} email={this.state.user.email}
                                                       resetPassword={_resetPassword.bind(this)}/>)}
                                />
                            }
                        </Content>
                    </Layout>
                </Layout>
            ) : ""
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