import axios from "axios";

const TODOS_REST_API_BASE_URL = "http://localhost:8080/api/todos";

export const getAllTodos = () => axios.get(TODOS_REST_API_BASE_URL);

export const saveTodo = (todo) => axios.post(TODOS_REST_API_BASE_URL, todo);

export const getTodo = (id) => axios.get(TODOS_REST_API_BASE_URL + "/" + id);

export const updateTodo = (id, todo) =>
  axios.put(TODOS_REST_API_BASE_URL + "/" + id, todo);

export const deleteTodo = (id) =>
  axios.delete(TODOS_REST_API_BASE_URL + "/" + id);

export const completeTodo = (id) =>
  axios.patch(TODOS_REST_API_BASE_URL + "/" + id + "/complete");

export const inCompleteTodo = (id) =>
  axios.patch(TODOS_REST_API_BASE_URL + "/" + id + "/in-complete");
