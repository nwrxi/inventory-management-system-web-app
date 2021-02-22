import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./layout/styles.css";
import App from "./layout/App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import ScrollToTop from "./layout/util/ScrollToTop";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
