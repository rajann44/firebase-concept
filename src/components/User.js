import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { usersTable } from "../firebase/firebaseConfigApp";

const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setUser([]); //Used to avoid duplicates on page
    try {
      const usersData = await getDocs(usersTable);
      usersData.forEach((userFromDb) => {
        setUser((prv) => [...prv, userFromDb.data()]);
      });
    } catch (error) {
      console.log("Get Data Error: " + error);
    }
  }

  return (
    <div className="container my-3 w-50">
      <ul className="list-group">
        {user.map((u, index) => {
          return (
            <li key={index} className="list-group-item">
              {u.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;
