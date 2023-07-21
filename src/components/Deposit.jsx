import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Deposit = ({ accountId }) => {
    const [type, setType] = useState("");
    const [payeeId, setPayeeId] = useState(null);
    const [medium, setMedium] = useState("");
    const [amount, setAmount] = useState(null);
    const [description, setDescription] = useState("");
    
    const handleSubmit = async event => {
        event.preventDefault();

        // Check if payeeId or amount are not set or empty
        if(!amount) {
            alert("Amount cannot be empty");
            return;
        }

        const deposit = {
            type,
            payee_id: payeeId,
            medium,
            amount,
            description,
        };
      
        try {
            const response = await axios.post(`http://localhost:8080/accounts/${accountId}/deposits`, deposit);
            console.log(response.data);
        } catch (error) {
            console.error('Failed to create deposit', error.response.data);
        }
        
      };
      return (
        <form onSubmit={handleSubmit}>
          <label>Type</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="DEPOSIT">DEPOSIT</option>
            <option value="SAVINGS">SAVINGS</option>
            {/* More options as per your enum */}
          </select>
{/* 
          <label>Payee ID</label>
          <input type="number" value={payeeId} onChange={e => setPayeeId(e.target.value)} /> */}

          <label>Medium</label>
          <select value={medium} onChange={e => setMedium(e.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="BALANCE">BALANCE</option>
            <option value="REWARDS">REWARDS</option>
            {/* More options as per your enum */}
          </select>

          <label>Amount</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />

          <label>Description</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
          
          <button type="submit">Create Deposit</button>
        </form>
      );
      
}

export default Deposit;
