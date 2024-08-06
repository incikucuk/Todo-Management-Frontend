import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employee";

//employeeleri tüm Rest apilerini almak için bir listening yazdık
export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployee = (employee) =>
  axios.post(REST_API_BASE_URL, employee);
