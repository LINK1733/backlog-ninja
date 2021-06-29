import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from './components/header';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className='container mt-5'>
                    <h1 className='text-center'>Welcome to Game Tracker</h1>
            </main>
        )
    }
}
// class App extends React.Component {
//     constructor(props) {
//         super(props);
//     }
function App() {
    
        return (
            <Router>
                <div>
                    <Header />

                    <Switch>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    
}
ReactDom.render(
        <App />,
    document.querySelector('#app-root')
)


/* 

parent component (game-list that has games and todos)
    when you click on the game it will show the todo list for that specific game

use react router instead of express router

*/