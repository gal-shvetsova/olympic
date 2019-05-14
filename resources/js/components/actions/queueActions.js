import axios from "axios";

export function getTable(args = {id: null}) {
    let host = window.location.hostname;
    const doRequest = axios.get('http://' + host + '/api/queue/' + args.id + '/');
    doRequest.then(
        (res) => {
            args.setState({
                table: res.data.table
            });
        }
    );
}