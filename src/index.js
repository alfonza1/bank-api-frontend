import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Routes, Link, Redirect } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SigninSignUp from './pages/signin-signup';
import CreateCustomer from './pages/createcustomer';
import CreateAccount from './pages/createaccount';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    
    <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SigninSignUp />} />
        <Route path="/createcustomer" element={<CreateCustomer />} />
        <Route path="/accountinfo" element={<App />}/>
        <Route path="/createaccount" element={<CreateAccount />} />
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
