import React, { Component } from "react";
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    <Link to="/todos"> Manage todos</Link>
                </div>
            </div>
        );
    }
}
export default WelcomeComponent