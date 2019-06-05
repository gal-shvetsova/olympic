import axios from "axios";

export function _forgotPassword(email) {
    let formData = new FormData();
    formData.append("email", email);
    let host = window.location.hostname;
    axios.post('http://' + host + "/api/password/email", formData)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.success) {
                alert('Success, please check your mail');
            }
            else {
                alert(json.data.data);
            }
        });

}