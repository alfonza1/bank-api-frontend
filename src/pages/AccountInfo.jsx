import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Deposit from '../components/Deposit';
import Withdrawal from '../components/Withdrawal';
import P2P from '../components/P2P';
import "../styles/accountinfo.css";

const AccountInfo = () => {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const { accountId } = useParams();



  useEffect(() => {
      const fetchAccountData = async () => {
      try {
          const accountResponse = await axios.get(`http://localhost:8080/accounts/${accountId}`);
          setAccount(accountResponse.data.data);
        const transactionResponse = await axios.get(`http://localhost:8080/account-transactions/${accountId}`);
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
    <div className="accountinfopage">
      <header>
        <h1 className="accounth1">Account Details</h1>
        <h1>Balance: <span className='balanceh1'>$ {account.balance}</span></h1>
        <p className="infoparagraphs">Type: {account.type}</p>
        <p className="infoparagraphs">ID: {account.id}</p>
        <p className="infoparagraphs" >Rewards: {account.rewards}</p>
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

              {/* Map functions for deposits */}
              {transactions.deposits && transactions.deposits.map(deposit => (
                <tr key={deposit.id}>
                  <td>{deposit.id}</td>
                  <td>{deposit.type}</td>
                  <td>{deposit.transaction_date}</td>
                  <td>{deposit.status}</td>
                  <td>{deposit.payer_id}</td>
                  <td>{deposit.medium}</td>
                  <td>{deposit.amount}</td>
                  <td>{deposit.description}</td>
                </tr>
              ))}

              {/* Map functions for transfers */}
              {transactions.transfers && transactions.transfers.map(transfer => (
                <tr key={transfer.id}>
                  <td>{transfer.id}</td>
                  <td>{transfer.type}</td>
                  <td>{transfer.transaction_date}</td>
                  <td>{transfer.status}</td>
                  <td>{transfer.payer_id}</td>
                  <td>{transfer.medium}</td>
                  <td>{transfer.amount}</td>
                  <td>{transfer.description}</td>
                </tr>
              ))}

              {/* Map functions for bill transactions */}
              {transactions.bills && transactions.bills.map(bill => (
                <tr key={bill.id}>
                  <td>{bill.id}</td>
                  <td>{bill.type}</td>
                  <td>{bill.transaction_date}</td>
                  <td>{bill.status}</td>
                  <td>{bill.payer_id}</td>
                  <td>{bill.medium}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
