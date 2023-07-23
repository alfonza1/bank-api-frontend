import React, { useEffect, useState } from "react";
import axios from 'axios';
import Deposit from '../components/Deposit';
import Withdrawal from '../components/Withdrawal';
import P2P from '../components/P2P';
import "../styles/accountinfo.css"

const AccountInfo = () => {
    const [account, setAccount] = useState(null);
    const [transactions, setTransactions] = useState(null);
  
    useEffect(() => {
      const fetchAccountData = async () => {
        try {
          const accountResponse = await axios.get(`http://localhost:8080/accounts/1`);
          setAccount(accountResponse.data.data);
  
          const transactionResponse = await axios.get(`http://localhost:8080/account-transactions/1`);
          setTransactions(transactionResponse.data.data);
        } catch (error) {
          console.error('Failed to fetch account data', error);
        }
      };
  
      fetchAccountData();
    }, []);
  
    if (!account) {
      return <div className="App">ERROR.No Account found.</div>;
    }
  
    return (
      <div className = "accountinfopage">
        <header>
          <h1 className = "accounth1">Account Details</h1>
          <h1>Balance: <span className='balanceh1'>$ {account.balance}</span></h1>
          <p className = "infoparagraphs">Type: {account.type}</p>
          <p className = "infoparagraphs">ID: {account.id}</p>
          <p className = "infoparagraphs" >Rewards: {account.rewards}</p>
          <Deposit accountId={account.id} />
          <Withdrawal accountId={account.id} />
          <P2P />
        </header>
  
        {transactions && (
          <div>
            <h2>Transactions</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Type</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Payer ID</th>
                  <th scope="col">Medium</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.withdrawals.map(withdrawal => (
                  <tr key={withdrawal.id}>
                    <td>{withdrawal.id}</td>
                    <td>{withdrawal.type}</td>
                    <td>{withdrawal.transaction_date}</td>
                    <td>{withdrawal.status}</td>
                    <td>{withdrawal.payer_id}</td>
                    <td>{withdrawal.medium}</td>
                    <td>{withdrawal.amount}</td>
                    <td>{withdrawal.description}</td>
                  </tr>
                ))}
                {/* Add similar map functions for deposits and transfers if they are included in your data */}
              </tbody>
            </table>
          </div>
        )}
  
      </div>
    );
  }

export default AccountInfo;
