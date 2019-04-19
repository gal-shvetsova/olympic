import axios from 'axios';


export function getTable(args = {id : null}) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const doRequest = axios.get('api/' + args.name +  '/' + (args.id ? args.id + '/' :""));
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
    return () => {
        return new Promise((resolve, reject) => {
            let doRequest = null;
            if (args.method == "POST")
            doRequest = axios.post('api/' + args.name + '/', args.data);
            else
                doRequest = axios.put('api/' + args.name + '/' + args.id, args.data);
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
            const doRequest = axios.delete('api/' + args.name + '/' + args.id);
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

