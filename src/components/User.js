import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocs } from "firebase/firestore";
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
        setUser((prv) => [...prv, { ...userFromDb.data(), id: userFromDb.id }]);
        console.log("Populating data in list");
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
            <Link to={`/user/edit/${u.id}`} key={index}>
              <li className="list-group-item">{u.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default User;
