import axios from 'axios';

export function _loginUser(email, password) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios.post("api/user/login/", formData)
        .then(response => {
            console.log(response);
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


        })
        .catch(error => {
            alert(`An Error Occured! ${error}`);
        });
}


export function _logoutUser() {
    let appState = {
        isLoggedIn: false,
        user: {}
    };
    // save app state with user date in local storage
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
}