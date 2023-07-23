import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <button type="button" className="moneybuttons btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling">Transfer Money</button>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Transfer Money</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <header className="App-header">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <label>P2P Source Account ID:</label>
                <input type="number" className="form-control" name="sourceAccountId" value={transfer.sourceAccountId} onChange={handleInputChange} required />
              </div>
              <div className="col-12">
                <label>Destination Account ID:</label>
                <input type="number" className="form-control" name="destinationAccountId" value={transfer.destinationAccountId} onChange={handleInputChange} required />
              </div>
              <div className="col-12">
                <label>Amount:</label>
                <input type="number" step="0.01" className="form-control" name="amount" value={transfer.amount} onChange={handleInputChange} required />
              </div>
              <div className="col-12">
              <button type="submit" className="btn btn-primary">Transfer Money</button>
              </div>
            </form>
          </header>
        </div>
      </div>
    </div>
  );
}

export default P2P;
