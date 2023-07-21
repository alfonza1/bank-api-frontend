import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  const handleSubmit = async (event) => {
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
  
        const accountResponse = await axios.post(`http://localhost:8080/customers/${customerId}/accounts`, accountData);
        if (accountResponse.data && accountResponse.data.data && accountResponse.data.data.id) {
          setAccountId(accountResponse.data.data.id); // Set the account ID in the parent component
        } else {
          console.error("Failed to create account");
        }
      } else {
        console.error("Failed to create customer");
      }
    } catch (error) {
      console.error("Error creating customer", error);
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
        <Link to="/accountinfo">
        <button type="submit">Meet the future of banking</button>
        </Link>
      </form>
    </div>
  );
};

  // return (
  //   <div>
  //     <h1>Become a Gradient&trade; Customer</h1>
  //     <p>Please fill out the form below to become a partner:</p>
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         First Name:
  //         <input
  //           type="text"
  //           value={firstName}
  //           onChange={(e) => setFirstName(e.target.value)}
  //         />
  //       </label>
  //       <label>
  //         Last Name:
  //         <input
  //           type="text"
  //           value={lastName}
  //           onChange={(e) => setLastName(e.target.value)}
  //         />
  //       </label>
  //       {address.map((addressItem, index) => (
  //         <div key={index}>
  //           <label>
  //             Street Number:
  //             <input
  //               type="text"
  //               value={addressItem.street_Number}
  //               onChange={(e) =>
  //                 setAddress((prevAddresses) => {
  //                   const updatedAddresses = [...prevAddresses];
  //                   updatedAddresses[index] = {
  //                     ...addressItem,
  //                     street_Number: e.target.value
  //                   };
  //                   return updatedAddresses;
  //                 })
  //               }
  //             />
  //           </label>
  //           <label>
  //             Street Name:
  //             <input
  //               type="text"
  //               value={addressItem.street_Name}
  //               onChange={(e) =>
  //                 setAddress((prevAddresses) => {
  //                   const updatedAddresses = [...prevAddresses];
  //                   updatedAddresses[index] = {
  //                     ...addressItem,
  //                     street_Name: e.target.value
  //                   };
  //                   return updatedAddresses;
  //                 })
  //               }
  //             />
  //           </label>
  //       {/* <label>
  //         Street Number:
  //         <input
  //           type="text"
  //           value={address.street_Number}
  //           onChange={(e) => setAddress({ ...address, street_Number: e.target.value })}
  //         />
  //       </label>
  //       <label>
  //         Street Name:
  //         <input
  //           type="text"
  //           value={address.street_Name}
  //           onChange={(e) => setAddress({ ...address, street_Name: e.target.value })}
  //         />
  //       </label> */}
  //       <label>
  //         City:
  //         <input
  //           type="text"
  //           value={address.city}
  //           onChange={(e) => setAddress({ ...address, city: e.target.value })}
  //         />
  //       </label>
  //       <label>
  //         State:
  //         <input
  //           type="text"
  //           value={address.state}
  //           onChange={(e) => setAddress({ ...address, state: e.target.value })}
  //         />
  //       </label>
  //       <label>
  //         Zip:
  //         <input
  //           type="text"
  //           value={address.zip}
  //           onChange={(e) => setAddress({ ...address, zip: e.target.value })}
  //         />
  //       </label>
  //       </div>
  //       /* <label>
  //         Account Type:
  //         <input
  //           type="text"
  //           value={accountType}
  //           onChange={(e) => setAccountType(e.target.value)}
  //         />
  //       </label>
  //       <label>
  //         Nickname:
  //         <input
  //           type="text"
  //           value={nickname}
  //           onChange={(e) => setNickname(e.target.value)}
  //         />
  //       </label>
  //       <label>
  //         Rewards:
  //         <input
  //           type="text"
  //           value={rewards}
  //           onChange={(e) => setRewards(e.target.value)}
  //         />
  //       </label>
  //       <label>
  //         Balance:
  //         <input
  //           type="text"
  //           value={balance}
  //           onChange={(e) => setBalance(e.target.value)}
  //         />
  //       </label> */}
  //       <Link to="/createaccount">
  //         <button type="submit">Meet the future of banking</button>
  //       </Link>
  //     </form>
  //   </div>
  // );


export default CreateCustomer;
