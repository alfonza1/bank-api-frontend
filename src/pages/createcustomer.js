import React, { useState } from 'react';
import axios from 'axios';

const CreateCustomer = ({ setAccountId }) => {
  const [first_Name, setFirstName] = useState('');
  const [last_Name, setLastName] = useState('');
  const [address, setAddress] = useState({
    street_Number: "",
    street_Name: "",
    city: "",
    state: "",
    zip: ""
  });
  const [accountType, setAccountType] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
  
    const customerData = {
      first_name: first_Name,
      last_name: last_Name,
      address: [address]
    };
  
    try {
      const customerResponse = await axios.post('http://localhost:8080/customers', customerData);
  
      if (customerResponse.data && customerResponse.data.data && customerResponse.data.data.id) {
        const customerId = customerResponse.data.data.id;
  
        const accountData = {
          type: accountType,
          nickname,
          rewards: 0,
          balance: 0
        };
  
        await axios.post(`http://localhost:8080/customers/${customerId}/accounts`, accountData);
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
          <input type="text" value={first_Name} onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={last_Name} onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          Street Number:
          <input type="text" value={address.street_Number} onChange={e => setAddress({...address, street_Number: e.target.value})} />
        </label>
        <label>
          Street Name:
          <input type="text" value={address.street_Name} onChange={e => setAddress({...address, street_Name: e.target.value})} />
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
        
        <button type="submit">Meet the future of banking</button>
      </form>
    </div>
  );
};

export default CreateCustomer;