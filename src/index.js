import React from 'react';
import ReactDOM from 'react-dom';
import './styles/boilerplate.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SigninSignUp from './pages/hero-page';
import BecomeACustomer from './pages/createcustomer';
import AccountInfo from './pages/AccountInfo';

let container = document.getElementById('root');
let root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SigninSignUp />} />
        <Route path="/createaccount" element={<BecomeACustomer />} />
        <Route path="/accountinfo" element={<AccountInfo />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
