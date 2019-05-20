import axios from "axios";

export function sortTable(args = {id : null}) {
    let host = window.location.hostname;

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            let doRequest = axios.post('http://' + host + '/api/' + args.name + '/sort', args.data);
            doRequest.then(
                (res) => {
                    dispatch({
                        type: args.name.toUpperCase() + '_SUCCESS',
                        table: res.data.table,
                    });
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
}
