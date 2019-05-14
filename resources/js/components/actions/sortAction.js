import axios from "axios";

export function sortTable(args = {id : null}) {
    let host = window.location.hostname;
    return () => {
        return new Promise((resolve, reject) => {
            let doRequest = axios.post('http://' + host + '/api/' + args.name + '/sort', args.data);
            doRequest.then(
                () => {
                },
                (err) => {
                    reject(err);
                }
            );
        });
    };
}
