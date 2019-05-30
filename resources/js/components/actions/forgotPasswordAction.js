import axios from "axios";

export default function _forgotPassword(email) {
    let formData = new FormData();
    formData.append("email", email);
    let host = window.location.hostname;
    console.log("ge");
    axios.post('http://' + host + "/api/password/email", formData)
        .then(response => {
            console.log("ge");
            return response;
        })
        .then(json => {
            if (json.data.success) {
                alert('Success, please check your mail');
                let appState = {
                    isLoggedIn: false,
                    user: { email : email}
                };

                localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: {
                            email : email
                        }
                    });
            }
            else {
                alert(json.data.data);
            }
        });

}