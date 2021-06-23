import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Header from './components/header';

class Home extends Component {
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
}
// ms-auto mt-2 btn btn-primary btn-small
ReactDom.render(
        <App />,
    document.querySelector('#app-root')
)