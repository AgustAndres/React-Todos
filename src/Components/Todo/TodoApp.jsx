import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import WelcomeComponent from './WelcomeComponent'
import ListTodoComponent from './ListTodoComponent'
import LogoutComponent from './LogoutComponent'
import ErrorComponent from './ErrorComponent'
import TodoComponent from './TodoComponent'


class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/welcome" component={WelcomeComponent} />
                        <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                        <AuthenticatedRoute path="/todos" component={ListTodoComponent} />
                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent />
                </Router>
            </div>
        )
    }
}

export default TodoApp