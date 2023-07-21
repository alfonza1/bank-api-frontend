import React, { useState } from "react";
import CreateAnAccount from "./createcustomer";
import { Link } from 'react-router-dom';


const SigninSignUp = () => {

    const [showCreateAccount, setShowCreateAccount] = useState(false);

    const handleSignUpClick = () => {
        setShowCreateAccount(true);
    };

    return (
        <div>
            <h1>Welcome to Gradient Bank&trade;</h1>
            <h2>Get started with the #1 bank in the world today!</h2>
            <Link to="/createcustomer">
        <button type="button" className="btn btn-secondary">Sign up</button>
      </Link>
            {/* <a href="/createaccount.js">
            <button type="button" className="btn btn-secondary">Sign in</button>
            </a> <a href="/createaccount.js">
            <button type="button" className="btn btn-secondary">Sign up</button>
            </a> */}
            {showCreateAccount && <CreateAnAccount />}
        </div>
    );
};

export default SigninSignUp;