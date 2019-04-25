import axios from 'axios';

const password_lenght  = 10;
const login_lenght  = 5;
const password_set = "abcdefghijklmnopqrstuvwxyz1234567890";
const login_set = "ABCDEFGHIJKLMNOPRSTUVWXYZ";

export function _registerUser(name, email, password) {

    let formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", name)
    formData.append("olympiad_id", -1);
    formData.append("role", "student");
    formData.append("student_id", -1);
    axios
        .post("register", formData)
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
            } else {
                alert(`Registration Failed!`);
            }
        })
        .catch(error => {
            alert("An Error Occured!" + error);
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
        .post("register", formData)
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
            } else {
                alert(`Registration Failed!`);
            }
        })
        .catch(error => {
            alert("An Error Occured!" + error);
        });
}

export function _deleteAccount(args={id : -1}) {
    axios
        .delete("/delete", agrs)
        .then (json => {
            if (json.data.success) {
                alert("Success");
            }
            else
                alert("no");
        })
}

