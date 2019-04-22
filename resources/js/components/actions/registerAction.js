import axios from 'axios';

export function _registerUser (name, email, password)  {
    var formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", name);

    axios
        .post("api/user/register", formData)
        .then(response => {
            console.log(response);
            return response;
        })
        .then(json => {
            if (json.data.success) {
                alert(`Registration Successful!`);

                let userData = {
                    name: json.data.data.name,
                    id: json.data.data.id,
                    email: json.data.data.email,
                    auth_token: json.data.data.auth_token,
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
            } else {
                alert(`Registration Failed!`);
            }
        })
        .catch(error => {
            alert("An Error Occured!" + error);
            console.log(`${formData} ${error}`);
        });
}