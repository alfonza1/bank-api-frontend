import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Deposit from './components/Deposit'; // Make sure the path is correct
import Withdrawal from './components/Withdrawal';

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/accounts/1');
        setAccount(response.data.data);
      } catch (error) {
        console.error('Failed to fetch account data', error);
      }
    };

    fetchAccountData();
  }, []);

  if (!account) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <header>
  
        <h1>Account Details</h1>
        <p>ID: {account.id}</p>
        <p>Type: {account.type}</p>
        <p>Nickname: {account.nickname}</p>
        <p>Rewards: {account.rewards}</p>
        <p>Balance: {account.balance}</p>
        <p>Customer ID: {account.customer_id}</p>
        <Deposit accountId={account.id} />
        <Withdrawal accountId={account.id} />
      </header>
    </div>
  );
}

export default App;
