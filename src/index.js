import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import { ConnectedRouter as Router } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from "./configStore";

ReactDOM.render( <Provider store={ store }>
    <Router history={ history }>
        <App/>
    </Router>
</Provider>, document.getElementById( "root" ), );
