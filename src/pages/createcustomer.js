import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateCustomer = ({ setAccountId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState([
    {
      street_Number: "",
      street_Name: "",
      city: "",
      state: "",
      zip: "",
    },
  ]);
  const [accountType, setAccountType] = useState("");
  const [nickname, setNickname] = useState("");
  const [rewards, setRewards] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const customerData = {
      first_name: firstName,
      last_name: lastName,
      address,
    };

    try {
      const response = await axios.post("http://localhost:8080/customers", customerData);
      if (response.status === 201) {
        // Customer created successfully
        const customerId = response.data.id; // Assuming your backend returns the created customer's ID
        console.log("Customer created with ID:", customerId);

        // Now you can proceed to create an account or do any other action if needed
        // For example:
        // const accountData = {
        //   type: accountType,
        //   nickname,
        //   rewards,
        //   balance,
        // };
        // const accountResponse = await axios.post(`http://localhost:8080/customers/${customerId}/accounts`, accountData);
        // setAccountId(accountResponse.data.id);

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
         <input
           type="text"
             value={firstName}
             onChange={(e) => setFirstName(e.target.value)}
           />
        </label>
         <label>
         Last Name:
          <input
           type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
         </label>
        {address.map((addressItem, index) => (
          <div key={index}>
            <label>
              Street Number:
              <input
                type="text"
                value={addressItem.street_Number}
                onChange={(e) =>
                  setAddress((prevAddresses) => {
                    const updatedAddresses = [...prevAddresses];
                    updatedAddresses[index] = {
                      ...addressItem,
                      street_Number: e.target.value,
                    };
                    return updatedAddresses;
                  })
                }
              />
            </label>
            <label>
              Street Name:
              <input
                type="text"
                value={addressItem.street_Name}
                onChange={(e) =>
                  setAddress((prevAddresses) => {
                    const updatedAddresses = [...prevAddresses];
                    updatedAddresses[index] = {
                      ...addressItem,
                      street_Name: e.target.value,
                    };
                    return updatedAddresses;
                  })
                }
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={addressItem.city}
                onChange={(e) =>
                  setAddress((prevAddresses) => {
                    const updatedAddresses = [...prevAddresses];
                    updatedAddresses[index] = {
                      ...addressItem,
                      city: e.target.value,
                    };
                    return updatedAddresses;
                  })
                }
              />
            </label>
            <label>
              State:
              <input
                type="text"
                value={addressItem.state}
                onChange={(e) =>
                  setAddress((prevAddresses) => {
                    const updatedAddresses = [...prevAddresses];
                    updatedAddresses[index] = {
                      ...addressItem,
                      state: e.target.value,
                    };
                    return updatedAddresses;
                  })
                }
              />
            </label>
            <label>
              Zip:
              <input
                type="text"
                value={addressItem.zip}
                onChange={(e) =>
                  setAddress((prevAddresses) => {
                    const updatedAddresses = [...prevAddresses];
                    updatedAddresses[index] = {
                      ...addressItem,
                      zip: e.target.value,
                    };
                    return updatedAddresses;
                  })
                }
              />
            </label>
          </div>
        ))}

        <Link to="/createaccount">
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
