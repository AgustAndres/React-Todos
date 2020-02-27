import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './Security/AuthenticatedRoute.jsx'
import LoginComponent from './Todo/LoginComponent.jsx'
import HeaderComponent from './VisualComponents/HeaderComponent'
import FooterComponent from './VisualComponents/FooterComponent'
import WelcomeComponent from './VisualComponents/WelcomeComponent'
import LogoutComponent from './VisualComponents/LogoutComponent'
import ErrorComponent from './Security/ErrorComponent'
import ListTodoComponent from './Todo/ListTodoComponent'
import TodoComponent from './Todo/TodoComponent'


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