import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className='container mt-5'>
                    <h1 className='text-center'>Hello from React</h1>
            </main>
        )
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
    }
        
    render() {

        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                        <ul className="container-fluid m-auto">
                            <Link to='/' className="navbar-brand">Home</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                                        <li className="nav-item"><a className="nav-link link-light" href="/logout">Logout</a></li>
                                    </ul>
                                </li>
                                </ul>
                            </div>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
// ms-auto mt-2 btn btn-primary btn-small
ReactDom.render(
        <App />,
    document.querySelector('#app-root')
)