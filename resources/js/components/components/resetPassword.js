import React, {Component} from 'react';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            formErrors: {password: ''},
            passwordValid: false,
            formValid: false
        }
    }

    handleUserInput() {
        return (e) => {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({[name]: value},
                () => {
                    this.validateField(name, value)
                });
        }
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'newPassword':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            passwordValid: passwordValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.passwordValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleLogin() {
        return (e) => {
            e.preventDefault();
            this.props.resetPassword(this.state.newPassword, this.state.oldPassword, this.props.email);
        }
    };

    render() {
        return (
            <form className="form">
                <h2>Sign up</h2>

                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <label htmlFor="oldPassword">Old password</label>
                    <input type="password" required className="form-control" name="oldPassword"
                           placeholder="Old password"
                           value={this.state.oldPassword}
                           onChange={this.handleUserInput()}/>
                </div>
                <div className={`form-group`}>
                    <label htmlFor="password">New password</label>
                    <input type="password" className="form-control" name="newPassword"
                           placeholder="Password"
                           value={this.state.newPassword}
                           onChange={this.handleUserInput()}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}
                        onClick={this.handleLogin()}>Reset
                </button>
            </form>
        )
    }
}

export default ResetPassword;