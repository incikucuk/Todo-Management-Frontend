import React, { useEffect, useState } from "react";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if(id){
        getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } 
  }, [id]);

  function saveOrUpdateDepartment(e) {
    e.preventDefault();

    const departmentObj = { departmentName, departmentDescription };
    console.log(departmentObj);

    if(id) {
      updateDepartment(id, departmentObj)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createDepartment(departmentObj)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleDepartmentName(e) {
    setDepartmentName(e.target.value);
  }

  function handleDepartmentDescription(e) {
    setDepartmentDescription(e.target.value);
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {/* <h2 className="text-center">Add Department</h2> */}
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Department name:</label>
                <input
                  type="text"
                  placeholder="Enter employee Department Name"
                  name="departmentName"
                  value={departmentName}
                  // className={`form-control ${errors.firstName ? 'is-invalid':''}`}
                  onChange={handleDepartmentName}
                  className="form-control"
                />
                {/* {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>} */}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Department Description:</label>
                <input
                  type="text"
                  placeholder="Enter Department Description"
                  name="departmentDescription"
                  value={departmentDescription}
                  // className={`form-control ${errors.lastName ? 'is-invalid':''}`}
                  onChange={handleDepartmentDescription}
                  className="form-control"
                />
                {/* {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>} */}
              </div>

              <button
                className="btn btn-success"
                onClick={saveOrUpdateDepartment}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
