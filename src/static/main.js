import React from 'react';
import ReactDom from 'react-dom';

function App() {
    return <h1 className='text-center'>Hello from React</h1>
}

ReactDom.render(
    <App />,
    document.querySelector('#app-root')
)