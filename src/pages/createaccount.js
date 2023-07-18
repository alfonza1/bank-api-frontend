import React from "react";

const CreateAnAccount = () => {
    return (
        <div>
          <h1>Create a Gradient&trade; Account</h1>
          <p>Please fill out the form below to create your account:</p>
          <form>
            <label>
              Name:
              <input type="text" />
            </label>
            <label>
              Email:
              <input type="email" />
            </label>
            <label>
              Password:
              <input type="password" />
            </label>
            <button type="submit">Create Account</button>
          </form>
        </div>
      );
};

export default CreateAnAccount;