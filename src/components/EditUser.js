import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database, usersTable } from "../firebase/firebaseConfigApp";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("In Effect: running getData() method");
    getData();
  }, []);

  //FETCHING DATA FROM DB
  async function getData() {
    try {
      const identifiedUser = doc(database, "users", id);
      const userDataFromDB = await getDoc(identifiedUser);
      setUpdateFormData(userDataFromDB.data());
      console.log("Data populated successfully :)");
    } catch (error) {
      console.log("Error while populating data" + error);
    }
  }

  //UPDATING DATA TO DB
  const updateUser = async () => {
    console.log("Update Form");
    try {
      const identifiedUser = doc(database, "users", id);
      await updateDoc(identifiedUser, {
        name: updateFormData.name,
        email: updateFormData.email,
        password: updateFormData.password,
      });
      console.log("Data updated to DB successfully!!");
    } catch (error) {
      console.log("Error while updating data" + error);
    }
  };

  //DELETING DATA FROM DB
  const deleteUser = async () => {
    console.log("Deleting User Started");
    try {
      await deleteDoc(doc(database, "users", id));
      console.log("Delete Successful");
      navigate("/user");
    } catch (error) {
      console.log("Error while deleting user: " + error);
    }
  };

  //DELETING DATA FROM DB USING WHERE
  const deleteUserUsingWhere = async () => {
    console.log("Deleting User Started with 'Where' query");
    try {
      //Example to fetch data using where ==
      const queryResult = query(
        usersTable,
        where("name", "==", updateFormData.name)
      );
      console.log("Result using where: " + queryResult);
      const querySnapshot = await getDocs(queryResult);
      console.log(querySnapshot);
      querySnapshot.forEach(async (singleResult) => {
        console.log(singleResult.data().name);
        console.log(singleResult.data().email);
        await deleteDoc(doc(database, "users", singleResult.data().email));
        console.log("Delete Successful for" + singleResult.data().email);
        navigate("/user");
      });
    } catch (error) {
      console.log("Error while deleting user: " + error);
    }
  };

  return (
    <div className="container w-50 p-3">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput0" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput0"
          placeholder="your name here"
          value={updateFormData.name}
          onChange={(e) =>
            setUpdateFormData({ ...updateFormData, name: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          value={updateFormData.email}
          onChange={(e) =>
            setUpdateFormData({ ...updateFormData, email: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput2" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlInput2"
          placeholder="secret password here"
          value={updateFormData.password}
          onChange={(e) =>
            setUpdateFormData({ ...updateFormData, password: e.target.value })
          }
        />
      </div>
      <button onClick={updateUser} type="button" className="btn btn-success">
        Update
      </button>
      <button
        onClick={deleteUser}
        type="button"
        className="btn btn-danger mx-3"
      >
        Delete
      </button>
      <button
        onClick={deleteUserUsingWhere}
        type="button"
        className="btn btn-warning mx-3"
      >
        Delete
      </button>
    </div>
  );
};

export default EditUser;
