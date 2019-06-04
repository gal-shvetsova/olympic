import React, {Component} from 'react';

class NewPassword extends Component {
    constructor(props) {
        super(props);
        console.log("here");
        this.state = {
            password: '',
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
        let passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
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
        }
    };

    render() {
        return (
            <form className="form">
                <h2>Sign up</h2>
                <div className={`form-group`}>
                    <label htmlFor="password">New password</label>
                    <input type="password" className="form-control" name="password"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.handleUserInput()}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}
                        onClick={this.handleLogin()}>Reset
                </button>
            </form>
        )
    }
}

export default NewPassword;