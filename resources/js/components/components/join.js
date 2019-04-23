import React from "react";
import { Link } from "react-router-dom";

const password_lenght  = 10;
const login_lenght  = 5;
const password_set = "abcdefghijklmnopqrstuvwxyz1234567890";
const login_set = "ABCDEFGHIJKLMNOPRSTUVWXYZ";

function password() {
    let password = ""
    for(let ma = 0; ma < password_lenght; ma++) {
        password += password_set[Math.floor(Math.random() * password_set.length)];
    }
    return password;
}

function login() {
    let login = "";
    for(let ma = 0; ma < login_lenght; ma++) {
        login += login_set[Math.floor(Math.random() * login_set.length)];
    }
    return login;
}

const Join = ({ history, registerParticipant = f => f }) => {
    console.log("i'm here");
    let _login, _password;
    const handleJoin = e => {
        e.preventDefault();
        registerParticipant({login : _login.value, password : _password.value});
    };
    return (
        <div id="main">
            <form id="login-form" action="" onSubmit={handleJoin} method="post">
                <h3 style={{ padding: 15 }}>Join Form</h3>
                <h4> Your login </h4>
                <input
                    ref={input => (_login = input)}
                    id="email-input"
                    className="center-block"
                    value = {login()}
                    >
                </input>
                <h4> Your password </h4>
                <input
                    ref={input => (_password = input)}
                    id="password-input"
                    className="center-block"
                    value = {password()}>
                </input>
                <p/>
                <button
                    type="submit"
                    className="landing-page-btn center-block text-center"
                    id="email-login-btn"
                    href="#facebook"
                >
                    Join
                </button>
                <button onClick={() =>  history.push("/olympiad")}>Back</button>
            </form>
        </div>
    );
};


export default Join;
