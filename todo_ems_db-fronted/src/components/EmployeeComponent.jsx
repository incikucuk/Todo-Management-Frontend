import React, { useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  //validation islemlerini yapabilmek icin kullandik
  const [error, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const navigator = useNavigate(); // add employyeden sonra sayfayonlendirmesi için anasayfa

  function handleFirstName(e) {
    setFirstName(e.target.value); //kullanıcının girdiği değeri anlık alır
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function saveEmployee(e) {
    e.preventDefault();

    if (validateForm) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      createEmployee(employee).then((response) => {
        console.log(response.data);
        navigator("/employees");
      });
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCoppy = { ...errors };

    if (firstName.trim()) {
      errorsCoppy.firstName = "";
    } else {
      errorsCoppy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCoppy.lastName = "";
    } else {
      errorsCoppy.lastName = "lastName name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCoppy.email = "";
    } else {
      errorsCoppy.email = "email name is required";
      valid = false;
    }

    setErrors(errorsCoppy);
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Add Employee</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First name:</label>
                <input
                  type="text"
                  placeholder="Enter employee First Name"
                  name="firstName"
                  value={firstName}
                  className={$}
                  onChange={handleFirstName}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last name:</label>
                <input
                  type="text"
                  placeholder="Enter employee Last Name"
                  name="lastName"
                  value={lastName}
                  className="form-control"
                  onChange={handleLastName}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter employee Email"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={handleEmail}
                />
              </div>
              <button className="btn btn-success" onClick={saveEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeComponent;
