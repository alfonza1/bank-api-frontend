import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SigninSignUp from './pages/signin-signup';
import CreateCustomer from './pages/createcustomer';

let container = document.getElementById('root');
let root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SigninSignUp />} />
        <Route path="/createaccount" element={<CreateCustomer />} />
        <Route path="/accountinfo" element={<App />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();