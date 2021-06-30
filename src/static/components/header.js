import React, { Component } from 'react';
import {
    Link,
} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                    <div className="container-fluid">
                        <Link to='/' className="navbar-brand">Home</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav dropdown ms-auto">
                                <li className="nav-link dropdown-toggle" id="navbarAccountDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </li>
                                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarAccountDropdown">
                                    <li><a className="dropdown-item nav-link link-light" href="/change-password">Change Password</a></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><a className="dropdown-item nav-link link-light" href="/logout">Logout</a></li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )   
    }
}