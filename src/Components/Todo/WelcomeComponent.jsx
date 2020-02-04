import React, { Component } from "react";
import { Link } from 'react-router-dom';
import HelloWorldService from '../api/todo/HelloWorldService'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }
    render() {
        return (
            <div>
                <h1>Welcome! {this.props.match.params.name}</h1>
                <div className="container">
                    <Link to="/todos"> Manage todos</Link>
                </div>

                <div className="container">
                    Customized welcome message
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get it</button>
                </div>

                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </div>
        );
    }
    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)//with the promise back
        .then(response => this.handleSuccessfulResponse(response)
        ).catch(error => this.handleError(error))
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