import React from "react";

const ListEmployeeComponent = () => {
  const dummyData = [
    {
      id: 1,
      firstName: "inci",
      lastName: "kucuk",
      email: "inci.com",
    },
    {
      id: 2,
      firstName: "xx",
      lastName: "xxc",
      email: "xxvv",
    },
    {
      id: 3,
      firstName: "ggb",
      lastName: "ggbbb",
      email: "inci.gbgb",
    },
  ];

  return (
    <div className="container">
      <h2 className="text-center">List Of Employees</h2>

      <table class="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Employee firstName</th>
            <th scope="col">Employee lastname </th>
            <th scope="col">Employee email</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {dummyData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListEmployeeComponent;
