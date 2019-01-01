import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";
import Survey from "./Survey.js";
import NotFound from './NotFound.js';
import { Route, BrowserRouter as Router } from 'react-router-dom'

const routing = (
    <Router>
        <div>
            <Route path="/" exact component={Survey} />
            <Route path="/questions/" component={App} />
            {/* <Route component={NotFound} /> */}
        </div>
    </Router>
);

ReactDom.render(routing, document.getElementById("root"));