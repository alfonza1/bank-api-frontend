import React from "react";

const BecomeACustomer = () => {
    return (
        <div>
          <h1>Become a Gradient&trade; Customer</h1>
          <p>Please fill out the form below to become a partner:</p>
          <form>
            <label>
              First Name:
              <input type="text" />
            </label>
            <label>
              Last Name:
              <input type="text" />
            </label>
            <label>
              Address:
              <input type="text" />
            </label>
            <button type="submit">Meet the future of banking</button>
          </form>
        </div>
      );
};

export default BecomeACustomer;