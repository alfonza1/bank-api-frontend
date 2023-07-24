import React, { useState } from 'react';
import axios from 'axios';
import "../styles/createcustomer.css"
import "../styles/boilerplate.css"
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
          balance: 0,
        };

        const accountResponse = await axios.post(`http://localhost:8080/customers/${customerId}/accounts`, accountData);

        if (accountResponse.data && accountResponse.data.data && accountResponse.data.data.id) {
          const accountId = accountResponse.data.data.id;

          // Redirect to the AccountInfo component with the newly created account ID
          navigate(`/accountinfo/${accountId}`);
        } else {
          console.error('Failed to get account ID');
        }
      } else {
        console.error('Failed to get customer ID');
      }
    } catch (error) {
      console.error('Failed to create customer or account', error);
    }
  };
  

  return (
    <div className='page'>
    <div class="container">

      <div className='h1andpara'>
    <h1 className='H1'>Become a Gradient&trade; Customer</h1>
    <p className='paragraph'>Please fill out the form below to become a partner:</p>
    </div>
   
    <form onSubmit={handleSubmit}>
      <div class="row">
        <div class = "row g-3">
        <div class="col-3">
          <div class="form-floating">
            <input type="text" class="form-control" id="firstName" placeholder="First Name" value={first_Name} onChange={e => setFirstName(e.target.value)} />
            <label for="firstName">First Name</label>
          </div>
        </div>
        <div class="col-3">
          <div class="form-floating">
            <input type="text" class="form-control" id="lastName" placeholder="Last Name" value={last_Name} onChange={e => setLastName(e.target.value)} />
            <label for="lastName">Last Name</label>
          </div>
        </div>
        </div>
        <div class = "row g-3">
        <div class="col-3">
          <div class="form-floating">
            <input type="text" class="form-control" id="streetNumber" placeholder="Street Number" value={address.street_Number} onChange={e => setAddress({...address, street_Number: e.target.value})} />
            <label for="streetNumber">Street Number</label>
          </div>
        </div>
        <div class="col-3">
          <div class="form-floating">
            <input type="text" class="form-control" id="streetName" placeholder="Street Name" value={address.street_Name} onChange={e => setAddress({...address, street_Name: e.target.value})} />
            <label for="streetName">Street Name</label>
          </div>
        </div>
        </div>

<div class = "row g-3">
        <div class="col-3">
          <div class="form-floating">
            <input type="text" class="form-control" id="city" placeholder="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
            <label for="city">City</label>
          </div>
        </div>
        <div class="col-3">
          <div class="form-floating">
            <input type="text" class="form-control" id="state" placeholder="State" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
            <label for="state">State</label>
          </div>
        </div>
        <div class="col-2">
          <div class="form-floating">
            <input type="text" class="form-control" id="zip" placeholder="Zip" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} />
            <label for="zip">Zip</label>
          </div>
        </div>
        </div>
<div class = "row g-3">
<div class="col-2">
          <div class="form-floating">
            <input type="text" class="form-control" id="nickname" placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
            <label for="nickname">Nickname</label>
          </div>
        </div>
        <div class="col-2 mb-5">
          <div class="form-floating">
          <select class="form-select" id="accountType" value={accountType} onChange={e => setAccountType(e.target.value)}>
              <option selected>Account Type</option>
            <option value="CHECKINGS">CHECKINGS</option>
            <option value="SAVINGS">SAVINGS</option>
          </select>
          </div>
        </div>
        </div>
      </div> 
        <button type="submit" class="btn btn-primary mt-3">Meet the future of banking</button>
       
    </form>
  </div> </div>
    );
};

export default CreateCustomer;