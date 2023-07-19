import React, { useState } from 'react';
import axios from 'axios';

const CreateCustomer = ({ setAccountId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState([{ street: '', city: '', state: '', zip: '' }]);
  const [accountType, setAccountType] = useState('');
  const [nickname, setNickname] = useState('');
  const [rewards, setRewards] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const customerData = {
      first_name: firstName,
      last_name: lastName,
      address
    };

    try {
      const customerResponse = await axios.post('http://localhost:8080/customers', customerData);

      if (customerResponse.data && customerResponse.data.id) {
        const accountData = {
          type: accountType,
          nickname,
          rewards,
          balance
        };

        const accountResponse = await axios.post(`http://localhost:8080/customers/${customerResponse.data.id}/accounts`, accountData);
        setAccountId(accountResponse.data.id);  // Setting the created account ID
      } else {
        console.error('Failed to get customer ID');
      }
    } catch (error) {
      console.error('Failed to create customer or account', error);
    }
  };

  return (
    <div>
      <h1>Become a Gradient&trade; Customer</h1>
      <p>Please fill out the form below to become a partner:</p>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
  Street:
  <input type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} />
</label>
<label>
  City:
  <input type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
</label>
<label>
  State:
  <input type="text" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
</label>
<label>
  Zip:
  <input type="text" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} />
</label>
        <label>
          Account Type:
          <input type="text" value={accountType} onChange={e => setAccountType(e.target.value)} />
        </label>
        <label>
          Nickname: 
          <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
        </label>
        <label>
          Rewards: 
          <input type="text" value={rewards} onChange={e => setRewards(e.target.value)} />
        </label>
        <label>
          Balance: 
          <input type="text" value={balance} onChange={e => setBalance(e.target.value)} />
        </label>
        <button type="submit">Meet the future of banking</button>
      </form>
    </div>
  );
};

export default CreateCustomer;
