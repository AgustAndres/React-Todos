import React, { Component } from "react";
import AutheticationService from './AuthenticationService.js'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AutheticationService.isUserLoggedIn();
        
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><Link to="/" className="navbar-brand">TheTodoAPP</Link></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AutheticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default withRouter(HeaderComponent);