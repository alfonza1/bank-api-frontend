import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Withdrawal = ({ accountId }) => {
    const [type, setType] = useState("");
    const [payerId, setPayerId] = useState(null);
    const [medium, setMedium] = useState("");
    const [amount, setAmount] = useState(null);
    const [description, setDescription] = useState("");
    const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);

    const handleButtonClick = () => {
      setShowWithdrawalForm(!showWithdrawalForm);
    };
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
      <div>
      <button type="button" className="moneybuttons btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#withdrawalOffcanvas">
        Withdrawal Money
      </button>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="withdrawalOffcanvas" aria-labelledby="withdrawalOffcanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="withdrawalOffcanvasLabel">Withdraw Money</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col-12">
            <label>Type</label>
            <select class="form-select" value={type} onChange={e => setType(e.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="WITHDRAWAL">CHECKINGS</option>
              {/* More options as per your enum */}
            </select>
          </div>

          <div class="col-12">
            <label>Account ID</label>
            <input class="form-control" type="number" value={payerId} onChange={e => setPayerId(e.target.value)} />
          </div>

          <div class="col-12">
            <label>Medium</label>
            <select class="form-select" value={medium} onChange={e => setMedium(e.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="BALANCE">BALANCE</option>
              <option value="REWARDS">REWARDS</option>
              {/* More options as per your enum */}
            </select>
          </div>

          <div class="col-12">
            <label>Amount</label>
            <input class="form-control" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>

          <div class="col-12">
            <label>Description</label>
            <input class="form-control" type="text" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Withdrawal Money</button>
      </form>
    </div>
  </div>

    </div>
      );
      
}

export default Withdrawal;