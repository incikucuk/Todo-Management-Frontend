import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const {id} = useParams();   //Kullanici id RESt'den almak icin useParams() hook kullanılır

  //validation islemlerini yapabilmek icin kullandik
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const navigator = useNavigate(); // add employyeden sonra sayfayonlendirmesi için anasayfa

  //update
  useEffect(() => {
     if(id){
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
      }).catch(error => {
        console.error(error);
      })
     }
  }, [id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validationForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      if(id){
        updateEmployee(id,employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.log(error);
        })
      }else{
        createEmployee(employee).then((response) =>{
          console.log(response.data);
          navigator('/employees')
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }

  function handleFirstName(e) {
    setFirstName(e.target.value); //kullanıcının girdiği değeri anlık alır
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function validationForm() {
    let valid = true;

    const errorsCopy = {... errors}  //shallowCopy=>uygulamadaki orjinal nesneler etkilenmez,ancak icice gecmis nsnelrin referansını saklar

    if(firstName.trim()){
      errorsCopy.firstName = ''
    }else{
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }

    if(lastName.trim()){
      errorsCopy.lastName = ''
    }else{
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }

    if(firstName.trim()){
      errorsCopy.email = ''
    }else{
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle(){
    if(id){
      return <h2 className="text-center">Update Employee</h2> 
    }else{
      return <h2 className="text-center">Add Employee</h2> 
    }
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {/* <h2 className="text-center">Add Employee</h2> */}
          {
               pageTitle()
          }
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First name:</label>
                <input
                  type="text"
                  placeholder="Enter employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid':''}`}
                  onChange={handleFirstName}
                />
                {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>}
              </div>
             
              <div className="form-group mb-2">
                <label className="form-label">Last name:</label>
                <input
                  type="text"
                  placeholder="Enter employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid':''}`}
                  onChange={handleLastName}
                />
                {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid':''}`}
                  onChange={handleEmail}
                />
                {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
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
