
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';



function P2P() {
    const [account, setAccount] = useState(null);
    const [transfer, setTransfer] = useState({
      sourceAccountId: '',
      destinationAccountId: '',
      amount: ''
    });
  
    const handleInputChange = (event) => {
      setTransfer({ ...transfer, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(
          `http://localhost:8080/accounts/${transfer.sourceAccountId}/accounts/${transfer.destinationAccountId}`,
          { amount: parseFloat(transfer.amount) }
        );
        alert(response.data.message);
        setAccount(response.data.data);
      } catch (error) {
        console.error('Error! Cannot complete transfer!', error);
        alert(error.message);
      }
    };
  
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         
          <form onSubmit={handleSubmit}>
            <label>
              Source Account ID:
              <input type="number" name="sourceAccountId" value={transfer.sourceAccountId} onChange={handleInputChange} required />
            </label>
            <label>
              Destination Account ID:
              <input type="number" name="destinationAccountId" value={transfer.destinationAccountId} onChange={handleInputChange} required />
            </label>
            <label>
              Amount:
              <input type="number" step="0.01" name="amount" value={transfer.amount} onChange={handleInputChange} required />
            </label>
            <button type="submit">Submit</button>
          </form>
        </header>
      </div>
    );
  }
  
  export default P2P;


