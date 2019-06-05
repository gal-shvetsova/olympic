import axios from "axios";
import {message} from 'antd';

export function _forgotPassword(email, handleLoad) {
    let formData = new FormData();
    formData.append("email", email);
    let host = window.location.hostname;
    axios.post('http://' + host + "/api/password/email", formData)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.success) {
                message.success('Success, please check your mail');
                this.props.history.replace('/login');
            }
            else {
                message.error(json.data.data);
                handleLoad(false);
            }
        });

}