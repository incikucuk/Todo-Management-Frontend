import React, { useEffect, useState } from 'react'
import { completeTodo, getAllTodos, inCompleteTodo } from '../services/TodoService'
import { useNavigate, useParams } from 'react-router-dom'


const ListTodoComponent = () => {

    const [todos, setTodos] = useState([])
    const navigate = useNavigate() 
    const {id} = useParams();

    useEffect(() => {
        listTodos();
    }, [])

    function listTodos() {
        getAllTodos().then((response) => {
            setTodos(response.data);
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    function addNewTodo() {
      navigate("/add-todo")
    }

    function updateTodo(id) {
      navigate(`/update-todo/${id}`)
    }

    function deleteTodo(id) {
      deleteTodo(id).then((response) =>{
        console.log(response.data);
        listTodos();
      }).catch(error =>{
        console.log(error);
      })
    }

    function markCompleteTodo(id) {
      completeTodo(id).then((response) => {
        listTodos();
      }).catch(error =>{
        console.log(error);
      })
    }

    function markInCompleteTodo(id) {
      inCompleteTodo(id).then((response) =>{
        listTodos();
      }).catch(error =>{
        console.log(error);
      })
    }

  return (
    <div className="container">
    <h2 className="text-center">List Of Todo</h2>
    <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Todo Title</th>
          <th>Todo Description</th>
          <th>Todo Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.completed ? "YES" : "NO"}</td>
            <td>
              <button
                onClick={() => updateTodo(todo.id)}
                className="btn btn-info"
              >
                Update
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
                style={{marginLeft:"10px"}}
              >
                Delete
              </button>
              <button
                onClick={() => markCompleteTodo(todo.id)}
                className="btn btn-success"
                style={{marginLeft:"10px"}}
              >
                Complete
              </button>
              <button
                onClick={() => markInCompleteTodo(todo.id)}
                className="btn btn-info"
                style={{marginLeft:"10px"}}
              >
                In Complete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default ListTodoComponent