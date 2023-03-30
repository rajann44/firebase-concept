import React, { useContext, useEffect, useState } from "react";
import { customersTable } from "../firebase/firebaseConfigApp";
import { Appstate } from "../App";
import { getDocs } from "firebase/firestore";

const Customers = () => {
  const [customer, setCustomer] = useState([]);
  const useAppstate = useContext(Appstate);

  useEffect(() => {
    if (useAppstate.login) {
      getData();
    } else {
      console.log(
        "Effect Ran, but didnt fetched data since user not logged in"
      );
    }
  }, []);

  async function getData() {
    setCustomer([]); //Used to avoid duplicates on page
    try {
      const customerData = await getDocs(customersTable);
      customerData.forEach((customerFromDb) => {
        console.log(customerFromDb.data());
        setCustomer((prv) => [...prv, { ...customerFromDb.data() }]);
        console.log("Populating data in list");
      });
    } catch (error) {
      console.log("Get Data Error: " + error);
    }
  }

  return (
    <div className="container my-3 w-50">
      <ul className="list-group">
        {customer.map((u, index) => {
          return (
            <li className="list-group-item" key={index}>
              {u.email}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Customers;
