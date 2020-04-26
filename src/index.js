import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import "./prism.css";
import './index.css';

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(<App />, document.getElementById('container'));
/*
import React from "react"
import ReactDOM from "react-dom"
import Prism from "prismjs"
import "./prism.css"
const code = `
const foo = 'foo';
const bar = 'bar';
console.log(foo + bar);
`.trim()
class Page extends React.Component {
    componentDidMount() {
        // You can call the Prism.js API here
        // Use setTimeout to push onto callback queue so it runs after the DOM is updated
        setTimeout(() => Prism.highlightAll(), 0)
    }
    render() {
        return (
            <pre className="line-numbers">
                <code className="language-js">
                    {code}
                </code>
            </pre>
        )
    }
}
ReactDOM.render(<Page />, document.getElementById("container"))
// Or call the Prism.js API here
setTimeout(() => Prism.highlightAll(), 0)
*/