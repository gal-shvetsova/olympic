import axios from "axios";
import {message} from 'antd'

export function _resetPassword(new_password, password, email) {

    let formData = new FormData();
    formData.append("password", password);
    formData.append("new_password", new_password);
    formData.append("email", email);
    axios
        .post("api/password/reset", formData)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.success) {
                const {name, id, email, role, olympiad_id} = json.data.data;
                let userData = {
                    id,
                    email,
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
                message.success('Success!')
            } else {
                message.error(json.data.data);
            }
        })
        .catch(error => {
            message.error("An Error Occured!" + error);
        });
}
