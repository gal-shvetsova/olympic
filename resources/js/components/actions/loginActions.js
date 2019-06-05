import axios from 'axios';
import {message} from "antd";

export function _loginUser(email, password, remember) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    axios.post("api/login/", formData)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.success) {
                const {id, role, email, olympiad_id} = json.data.data;
                let userData = {
                    id : id,
                    role : role,
                    email : email,
                    olympiad_id : olympiad_id,
                    timestamp: new Date().toString()
                };

                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                if (remember)
                    localStorage["appState"] = JSON.stringify(appState);

                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user
                });
            }
            else {
                message.error(json.data.data);
            }
        });

}

export function _logoutUser() {
    let appState = {
        isLoggedIn: false,
        user: {
            role: "guest"
        }
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
    this.props.history.replace('/login');
}