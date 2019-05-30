import axios from "axios";

export function _newPassword(email, password) {
    let formData = new FormData();
    let host = window.location.hostname;
    formData.append("email", email);
    formData.append("password", password);
    axios.post('http://' + host + "/api/password/email", formData)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.success) {
                alert('Success, please login with new password')
            }
            else {
                alert(json.data.data);
            }
        });

}