import axios from 'axios';

export function _loginUser(email, password) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    axios.post("api/login/", formData)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.success) {
                const {id, role, olympiad_id} = json.data.data;

                let userData = {
                    id : id,
                    role : role,
                    olympiad_id : olympiad_id,
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
            }
            else {
                alert(json.data.data);
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
    this.props.setUserInfo(false, {role : "guest"});
    this.setState(appState);
}