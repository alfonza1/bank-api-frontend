import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateCustomer from './pages/createcustomer';
import Deposit from './components/Deposit';
import Withdrawal from './components/Withdrawal';
import P2P from './P2P';

function App() {
  const [accountId, setAccountId] = useState(null);
  const [account, setAccount] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // New state for checking if user is logged in

  useEffect(() => {
    const fetchAccountData = async () => {
      if (accountId) {
        try {
          const response = await axios.get(`http://localhost:8080/accounts/${accountId}`);
          setAccount(response.data.data);
        } catch (error) {
          console.error('Failed to fetch account data', error);
        }
      }
    };

    fetchAccountData();
  }, [accountId]);

  const onLogin = (id) => {
    setAccountId(id);
    setLoggedIn(true);
  }

  if (!loggedIn) {
    // If the user is not logged in, render the CreateCustomer component
    return <CreateCustomer onLogin={onLogin} />;
  }

  // Otherwise, render the App component
  return (
    <div className="App">
      <header>
        <h1>Account Details</h1>
        <p>ID: {account?.id}</p>
        <p>Type: {account?.type}</p>
        <p>Nickname: {account?.nickname}</p>
        <p>Rewards: {account?.rewards}</p>
        <p>Balance: {account?.balance}</p>
        <p>Customer ID: {account?.customer_id}</p>
        {accountId && <Deposit accountId={accountId} />}
        {accountId && <Withdrawal accountId={accountId} />}
        <P2P />
      </header>
    </div>
  );
}

export default App;
