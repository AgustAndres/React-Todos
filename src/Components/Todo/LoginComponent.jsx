import React, { Component } from "react";
import AutheticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        /*this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);*/
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    /*
    handleUsernameChange(event) {
        console.log("user: " +event.target.value);
        this.setState({  username: event.target.value })
    }
    handlePasswordChange(event) {
        console.log("pass: "+event.target.value);
        this.setState({ password: event.target.value })
    }*/

    loginClicked() {
        /*if (this.state.username === '1' && this.state.password === '1') {
            AutheticationService.registerSuccesfullLogin(this.state.username, this.state.password)

            this.props.history.push(`/welcome/${this.state.username}`)
        } else {
            this.setState({ hasLoginFailed: true })
            this.setState({ showSuccessMessage: false })
        }*/

        AutheticationService.executeBasicAuthenticationService(this.state.username, this.state.password)

            .then(() => {
                AutheticationService.registerSuccesfullLogin(this.state.username, this.state.password)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(
                () => {
                    this.setState({ hasLoginFailed: true })
                    this.setState({ showSuccessMessage: false })
                }
            )
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                    {this.state.showSuccessMessage && <div>Login succesfull</div>}

                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}
export default LoginComponent