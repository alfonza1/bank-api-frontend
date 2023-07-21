import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Deposit from './components/Deposit';
import Withdrawal from './components/Withdrawal';
import P2P from './P2P';
import { useLocation } from 'react-router';


function App() {
  const location = useLocation();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Check if there is account data in the location state (set by CreateCustomer)
    if (location.state && location.state.accountData) {
      setAccount(location.state.accountData);
    } else {
      // If there is no account data, fetch the account with ID 3 (existing behavior)
      const fetchAccountData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/accounts/3');
          setAccount(response.data.data);
        } catch (error) {
          console.error('Failed to fetch account data', error);
        }
      };

      fetchAccountData();
    }
  }, [location.state]);

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
      <P2P />
      </header>
    </div>
  );
}

export default App;