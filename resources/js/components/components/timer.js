import React, {Component} from 'react';
import {message} from 'antd'

export class Timer extends Component {
    constructor(props) {
        super(props);
        let time = this.props.time.split(":");
        let h = time[0];
        let m = time[1];
        let end = new Date(this.props.start.getTime());
        end.setHours(end.getHours() + parseInt(h), end.getMinutes() + parseInt(m));
        this.state = ({
            start: this.props.start,
            time: this.props.time,
            end: end
        });
        this.startTimer();
    }

    msToTime(s) {
        let ms = s % 1000;
        s = (s - ms) / 1000;
        let secs = s % 60;
        s = (s - secs) / 60;
        let mins = s % 60;
        let hrs = (s - mins) / 60;

        return hrs + ':' + mins + ':' + secs;
    }

    componentWillUnmount() {
        clearTimeout(this.state.id);
    }

    startTimer() {
        let now = new Date(Date.now());
        let diff = this.state.end.getTime() - now;
        if (diff <= 0) {
            message.info('Time is over');
            clearTimeout(this.state.id);
            this.props.onEnd();
            return;
        }
        this.setState({time: this.msToTime(diff), id: setTimeout(this.startTimer.bind(this), 1000)});
    }

    render() {
        return (
            <div className="timer">
                <h2>{this.state.time}</h2>
            </div>);
    }
}

export default Timer;