import React, { Component } from "react";
import AutheticationService from '../Security/AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked = () => {
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
                    <div class="form-group">
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                        {this.state.showSuccessMessage && <div>Login succesfull</div>}

                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="username">Username</label>
                                <input type="text"
                                    class="form-control"
                                    id="username" name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange} />
                            </div>

                            <div class="form-group col-md-6">
                                <label for="password">Password</label>
                                <input type="password"
                                    class="form-control"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                            </div>
                        </div>

                        <button className="btn btn-success"
                            onClick={this.loginClicked}>Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginComponent