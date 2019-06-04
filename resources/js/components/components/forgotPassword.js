import React, {Component} from 'react';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            formErrors: {email: ''},
            emailValid: false,
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
        let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSend(){
        this.props.forgotPassword(this.state.email);
    }

    render() {
        return (
            <form className="form">
                <h2>Sign up</h2>
                <div className="panel panel-default">
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" required className="form-control" name="email"
                           placeholder="Email"
                           value={this.state.email}
                           onChange={this.handleUserInput()}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}
                        onClick={this.handleSend.bind(this)}>Ok
                </button>
            </form>
        )
    }
}

export default ForgotPassword;