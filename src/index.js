import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ConnectedRouter as Router } from "connected-react-router";
import { Provider } from "react-redux";

import configStore, {history} from "./configStore";

const initialState = {};
const store = configStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
