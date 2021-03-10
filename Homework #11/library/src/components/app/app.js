import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from "../login-page";
import HomePage from "../home-page";

export default function App() {
    return (
        <Router>
            <div>
                <Route path='/' exact component={LoginPage}/>
                <Route path='/home' component={HomePage}/>
            </div>
        </Router>
    );
}