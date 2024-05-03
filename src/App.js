import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllAndRemaining from './components/CheckAllAndRemaining.js';
import TodoFilters from './components/TodoFilters.js';
import ClearCompletedBtn from './components/ClearCompletedBtn.js';
import { useEffect, useState } from 'react';

function App() {
  const [todos,setTodos] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3001/todos')
    .then(res=>res.json())
    .then((todos)=>{
      setTodos(todos)
    })
  },[])


  //add todo fun
  let addTodo =(todo) =>{
    //add data at server side
    fetch('http://localhost:3001/todos',{
      method : 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(todo),
    })
    //add data at client side
    setTodos(prevState=>[...prevState,todo])
  };


  //delete to do fun
  let deleteTodo = (todoId)=>{
    console.log(todoId)
    //server side delete
    fetch(`http://localhost:3001/todos/${todoId}`, {
  method: "DELETE"
})
    //client side delete
    setTodos(prevState=>{
      return prevState.filter(todo=>{
        return todo.id !== todoId
      })
    })
  }


  //update to do fun
  let updateTodo = (todo) =>{
    console.log('success')
    //server update
    fetch(`http://localhost:3001/todos/${todo.id}`,{
      method : "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(todo),
    })
   
    //client update
    setTodos(prevState=>{
      return prevState.map(t=>{
        if(t.id === todo.id){
          return todo
        }
        return t;
      })
    })
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
        <CheckAllAndRemaining/>
        <div className="other-buttons-container">
          <TodoFilters/>
          <ClearCompletedBtn/>
        </div>
      </div>
    </div>
  );
}

export default App;
