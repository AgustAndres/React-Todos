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
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked() {
            AutheticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AutheticationService.registerSuccesfullLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/welcome`)
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