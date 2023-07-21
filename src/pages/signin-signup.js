import React, { useState } from "react";
import CreateAnAccount from "./createcustomer";
import { Link } from 'react-router-dom';
import '../styles/signup.css';

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=M+PLUS+Code+Latin:wght@200&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);


const SigninSignUp = () => {

    const [showCreateAccount, setShowCreateAccount] = useState(false);

    const handleSignUpClick = () => {
        setShowCreateAccount(true);
    };

    return (
        <div className="whole-page">
        <div className="welcome">
            <h1>Welcome to Gradient Bank&trade;</h1>
            <h2>Get started with the #1 bank for coders today!</h2>
            <Link to="/createaccount">
                <button type="button" className="btn btn-secondary">Become a partner</button>
            </Link>
            {/* <a href="/createaccount.js">
            <button type="button" className="btn btn-secondary">Sign in</button>
            </a> <a href="/createaccount.js">
            <button type="button" className="btn btn-secondary">Sign up</button>
            </a> */}
            {showCreateAccount && <CreateAnAccount />}
        </div>
        </div>
    );
};

export default SigninSignUp;