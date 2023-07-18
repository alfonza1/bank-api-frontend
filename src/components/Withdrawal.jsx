import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Withdrawal = ({ accountId }) => {
    const [type, setType] = useState("");
    const [payerId, setPayerId] = useState(null);
    const [medium, setMedium] = useState("");
    const [amount, setAmount] = useState(null);
    const [description, setDescription] = useState("");
    
    const handleSubmit = async event => {
        event.preventDefault();

        // Check if payeeId or amount are not set or empty
        if(!payerId || !amount) {
            alert("Payer ID and Amount cannot be empty");
            return;
        }

        const withdrawal = {
            type,
            payer_id: payerId,
            medium,
            amount,
            description,
        };
      
        try {
            const response = await axios.post(`http://localhost:8080/accounts/${accountId}/withdrawals`, withdrawal);
            console.log(response.data);
        } catch (error) {
            console.error('Failed to create withdrawal', error.response.data);
        }
        
      };
      return (
        <form onSubmit={handleSubmit}>
          <label>Type</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="WITHDRAWAL">CHECKINGS</option>
            {/* More options as per your enum */}
          </select>

          <label>Payer ID</label>
          <input type="number" value={payerId} onChange={e => setPayerId(e.target.value)} />

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
          
          <button type="submit">Create Withdrawal</button>
        </form>
      );
      
}

export default Withdrawal;
