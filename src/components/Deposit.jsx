import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Deposit = ({ accountId }) => {
    const [type, setType] = useState("");
    const [payeeId, setPayeeId] = useState(null);
    const [medium, setMedium] = useState("");
    const [amount, setAmount] = useState(null);
    const [description, setDescription] = useState("");
    const [showDepositForm, setShowDepositForm] = useState(false);

    const handleButtonClick = () => {
      setShowDepositForm(!showDepositForm);
    };
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
       <div>
      <button type="button" className="moneybuttons btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#depositOffcanvas">
        Deposit Money
      </button>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="depositOffcanvas" aria-labelledby="depositOffcanvasLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="depositOffcanvasLabel">Deposit Money</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
        <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <label>Type</label>
          <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="DEPOSIT">DEPOSIT</option>
            <option value="SAVINGS">SAVINGS</option>
          </select>
        </div>
        <div className="col-12">
          <label>Medium</label>
          <select className="form-select" value={medium} onChange={e => setMedium(e.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="BALANCE">BALANCE</option>
            <option value="REWARDS">REWARDS</option>
          </select>
        </div>
        <div className="col-12">
          <label>Amount</label>
          <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className="col-12">
          <label>Description</label>
          <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Create Deposit</button>
        </div>
      </form>
        </div>
      </div>
    </div>
      );
      
}

export default Deposit;