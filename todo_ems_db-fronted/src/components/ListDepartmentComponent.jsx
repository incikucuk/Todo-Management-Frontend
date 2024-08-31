import React, { useEffect, useState } from "react";
import {getAllDepartments } from "../services/DepartmentService";
import {useNavigate, useParams } from "react-router-dom";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);
  const navigator =  useNavigate();

  useEffect(() => {
    listOfDepartments();
  }, []);

  function listOfDepartments() {
    getAllDepartments()
    .then((response) => {
      console.log(response.data);
      setDepartments(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function updateDepartment(id) {
    navigator(`/edit-department/${id}`)
  }

  function deleteDepartment(id) {
    deleteDepartment(id).then((response) =>{
      console.log(response.data);
      listOfDepartments();
    }).catch((error) =>{
      console.log(error);
    })
  }

  return (
    <div className="container">
      <h2 className="text-center">List Of Departments</h2>
      <Link to="/add-department" className="btn btn-primary mb-2">
        Add Department
      </Link>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  onClick={() => updateDepartment(department.id)}
                  className="btn btn-info"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteDepartment(department.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartmentComponent;
