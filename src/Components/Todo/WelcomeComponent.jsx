import React, { Component } from "react";
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    <Link to="/todos"> Manage todos</Link>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </div>
        );
    }
    handleSuccessfulResponse(response) {
        this.setState({ welcomeMessage: response.data.message })
    }
    handleError(error){
        let errorMessage='';
        if(error.message)errorMessage += error.message

        if(error.response && error.response.data){
            errorMessage += error.response.data.message
        }
        this.setState({welcomeMessage:errorMessage})
    }
}

export default WelcomeComponent