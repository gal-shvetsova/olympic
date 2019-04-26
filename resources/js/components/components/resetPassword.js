import React from "react";

const ResetPassword = ({ history, resetPassword, auth_token = f => f }) => {
    let _new_password, _password;
    const handleReset = e => {
        e.preventDefault();
        resetPassword(_new_password.value, _password.value, auth_token);
        history.push("olympiad");
    };
    return (
        <div id="main">
            <form id="reset-password-form" action="" onSubmit={handleReset} method="post">
                <h3 style={{ padding: 15 }}>Reset form</h3>
                <input
                    ref={input => (_password = input)}
                    autoComplete="off"
                    id="password-input"
                    name="password"
                    type="password"
                    className="center-block"
                    placeholder="old password"
                />
                <input
                    ref={input => (_new_password = input)}
                    autoComplete="off"
                    id="new-password-input"
                    name="new_password"
                    type="password"
                    className="center-block"
                    placeholder="new password"
                />
                <button
                    type="submit"
                    className="landing-page-btn center-block text-center"
                    id="email-login-btn"
                    >
                    Reset
                </button>
            </form>
        </div>
    );
};


export default ResetPassword;
