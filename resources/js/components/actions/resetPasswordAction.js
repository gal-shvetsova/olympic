import axios from "axios";

export function _resetPassword(new_password, password, auth_token) {

    let formData = new FormData();
    formData.append("password", password);
    formData.append("new_password", new_password);
    formData.append("auth_token", auth_token);
    axios
        .post("api/password/reset", formData)
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
                alert(`Reseting Failed!`);
            }
        })
        .catch(error => {
            alert("An Error Occured!" + error);
        });
}
