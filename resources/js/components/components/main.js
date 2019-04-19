import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import axios from "axios";
import $ from "jquery";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }

    _loginUser  (email, password)  {
        $("#login-form button")
            .attr("disabled", "disabled")
            .html(
                '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
            );
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        axios.post("login/", formData)
            .then(response => {
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    alert("Login Successful!");
                    const {name, id, email, auth_token} = json.data.data;

                    let userData = {
                        name,
                        id,
                        email,
                        auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });
                } else alert("Login Failed!");
                $("#login-form button")
                    .removeAttr("disabled")
                    .html("Login");

            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
                $("#login-form button")
                    .removeAttr("disabled")
                    .html("Login");
            });
    };

    _registerUser(name, email, password) {

        let formData = new FormData();
        formData.append("password", password);
        formData.append("email", email);
        formData.append("name", name);

        axios
            .post("register", formData)
            .then(response => {
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    alert(`Registration Successful!`);
                    const {name, id, email, auth_token} = json.data.data;
                    let userData = {
                        name,
                        id,
                        email,
                        auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });
                    // redirect home
                    //this.props.history.push("/");
                } else {
                    alert(`Registration Failed!`);
                }
            })
            .catch(error => {
                alert("An Error Occured!" + error);
            });
    };

    _logoutUser() {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
    };

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }
    }

    render() {
        if (
            !this.state.isLoggedIn &&
            this.props.location.pathname !== "/login" &&
            this.props.location.pathname !== "/register" &&
            this.props.location.pathname !== "/olympiad"
        ) {
            this.props.history.push("/login");
        }
        if (
            this.state.isLoggedIn &&
            (this.props.location.pathname === "/login" ||
                this.props.location.pathname === "/register" )
        ) {

            this.props.history.push("/olympiad");
        }
        return (
            <Switch data="data">
                <div id="main">
                    <Route
                        path="/login"
                        render={props => (<Login {...props} loginUser={this._loginUser.bind(this)}/>)}
                    />

                    <Route
                        path="/register"
                        render={props => (<Register {...props} registerUser={this._registerUser.bind(this)}/>)}
                    />
                    <button onClick={this._logoutUser.bind(this)}>Logout</button>
                </div>
           </Switch>
        );
    }
}

const AppContainer = withRouter((props) => (<App {...props} />));

export default AppContainer