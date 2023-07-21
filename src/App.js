import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateCustomer from './pages/createcustomer';
import Deposit from './components/Deposit';
import Withdrawal from './components/Withdrawal';
import P2P from './P2P';

function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/accounts/${account.accountId}`);
        setAccount(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch account data', error);
        setLoading(false);
      }
    };

    if (account && account.accountId) {
      fetchAccountData();
    }
  }, [account]); // Listen for changes to account

  // Function to set the account ID after successful account creation
  const handleAccountCreation = (accountId) => {
    setAccount({ accountId });
  };

  return (
    <div className="App">
      <header>
        <h1>Account Details</h1>
        {loading ? (
          <div>Loading...</div>
        ) : account ? (
          <>
            <p>ID: {account.id}</p>
            <p>Type: {account.type}</p>
            <p>Nickname: {account.nickname}</p>
            <p>Rewards: {account.rewards}</p>
            <p>Balance: {account.balance}</p>
            <p>Customer ID: {account.customer_id}</p>
            <Deposit accountId={account.id} />
            <Withdrawal accountId={account.id} />
            <P2P />
          </>
        ) : (
          <CreateCustomer handleAccountCreation={handleAccountCreation} />
        )}
      </header>
    </div>
  );
}

export default App;
