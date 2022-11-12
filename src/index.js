import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import firebaseConfig from "./firebaseConfig";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);

reportWebVitals();
