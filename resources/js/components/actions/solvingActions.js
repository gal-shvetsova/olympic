import axios from "axios";

export function sendSolution(args = {id : null}) {
    let host = window.location.hostname;
    return () => {
        return new Promise((resolve, reject) => {
            axios.post('http://' + host + '/api/queue', args.data)
            .then(
                () => {

                },
                (err) => {
                    reject(err);
                }
            );
        });
    };
}