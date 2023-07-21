import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateAccount = ({ setCustomerId }) => {
  const [accountType, setAccountType] = useState("");
  const [nickname, setNickname] = useState("");
  const [rewards, setRewards] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    const accountData = {
      accountType: accountType,
      nickname: nickname,
      rewards: rewards,
      balance: balance
    };

    try {
      const customerResponse = await axios.post('http://localhost:8080/customers/', accountData);

      if (customerResponse.data && customerResponse.data.id) {
        const accountData = {
          type: accountType,
          nickname,
          rewards,
          balance
        };

        const accountResponse = await axios.post(`http://localhost:8080/customers/${customerResponse.data.id}/accounts`, accountData);
        setCustomerId(accountResponse.data.id);  // Setting the created account ID
      } else {
        console.error('Failed to get customer ID');
      }
    } catch (error) {
      console.error('Failed to create customer or account', error);
    }
  };

  return (
    <div>
      <h1>Become a Gradient&trade; Customer</h1>
      <p>Please fill out the form below to become a partner:</p>
      <form onSubmit={handleSubmit}>
        <label>
          Account Type:
          <input type="text" value={accountType} onChange={e => setAccountType(e.target.value)} />
        </label>
        <label>
          Nickname: 
          <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
        </label>
        <label>
          Rewards: 
          <input type="text" value={rewards} onChange={e => setRewards(e.target.value)} />
        </label>
        <label>
          Balance: 
          <input type="text" value={balance} onChange={e => setBalance(e.target.value)} />
        </label>
        <Link to="/createaccount">
        <button type="submit">Meet the future of banking</button>
      </Link>
      </form>
    </div>
  );
};

export default CreateAccount;
