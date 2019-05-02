import axios from 'axios';


export function getTable(args = {id : null}) {
    let host = window.location.hostname;
    console.log(args.name.toUpperCase() + '_SUCCESS');
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const doRequest = axios.get('http://' + host + '/api/' + args.name +  '/' + (args.id ? args.id + '/' :""));
            doRequest.then(
                (res) => {
                    dispatch({
                        type: args.name.toUpperCase() + '_SUCCESS',
                        table: res.data.table,
                    });
                    resolve(res);
                },
                (err) => {
                    dispatch({
                        type: args.name.toUpperCase() + 'FAILURE',
                        data: {error: err},
                    });
                    reject(err);
                },
            );
        });

    };
}

export function postTable(args = {id : null}) {
    let host = window.location.hostname;
    return () => {
        return new Promise((resolve, reject) => {
            let doRequest = null;
            if (args.method == "POST")
            doRequest = axios.post('http://' + host + '/api/' + args.name + '/', args.data);
            else
                doRequest = axios.put('http://' + host +  '/api/' + args.name + '/' + args.id, args.data);
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

export function deleteTable(args = {}) {
    return () => {
        return new Promise((resolve, reject) => {
            const doRequest = axios.delete('http://' + host + '/api/' + args.name + '/' + args.id);
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

