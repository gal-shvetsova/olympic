import axios from "axios";

export function filterTable(args = {id : null}) {
    let host = window.location.hostname;

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            let doRequest = axios.post('http://' + host + '/api/' + args.name + '/filter', args.data);
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
