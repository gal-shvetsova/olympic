import axios from 'axios';
import {message} from "antd";

export function _registerUser(name, email, password, history) {

    let formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("olympiad_id", -1);
    formData.append("role", "student");
    formData.append("student_id", -1);
    axios
        .post("/api/register", formData)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.success) {
                message.success('Success! Verification link has been sent to your email');
                history.replace('/login');
            } else {
                message.error(json.data.data);
            }
        })
        .catch(error => {
            message.error("An Error Occured!" + error);
        });
}


export function _registerParticipant(args = {password : "", login : "", olympiad_id : -1, role : "student", student_id : -1}) {

    let formData = new FormData();

    formData.append("password", args.password);
    formData.append("email", args.login);
    formData.append("name", args.login);
    formData.append("olympiad_id", args.olympiad_id);
    formData.append("role", args.role);
    formData.append("student_id", args.student_id);
    axios
        .post("api/register", formData)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.success) {
                const {name, id, email, auth_token, role, olympiad_id} = json.data.data;
                let userData = {
                    name,
                    id,
                    email,
                    auth_token,
                    role,
                    olympiad_id,
                    timestamp: new Date().toString()
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user
                });
                alert('Success!');
            } else {
                alert(`Registration Failed!`);
            }
        })
        .catch(error => {
            alert("An Error Occured!" + error);
        });
}

export function _deleteAccount() {
    axios
        .delete("api/student" + '/' + this.state.user.id)
        .then (json => {
            console.log(json);
            if (json.data === 200) {
                message.success("Success");
                let appState = {
                    isLoggedIn: false,
                    user: {
                        role: "guest"
                    }
                };
                localStorage["appState"] = JSON.stringify(appState);
                this.setState(appState);
                this.props.history.replace('/register');
            }
            else
                message.error("Something went wrong");
        })
}

export function _verifyEmail(token){
    let host = window.location.hostname;
    axios
        .get('http://' + host + '/api' + token)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.response === 'ok') {
               message.success('Successfully verified! Please log in')
            } else {
                message.error('Something went wrong');
            }
        })
        .catch(error => {
            message.error("An Error Occured!" + error);
        });
}

