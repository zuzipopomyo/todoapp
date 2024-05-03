import React, { useState } from 'react';

export default function Todo({ todo, deleteTodo, updateTodo}) {
  // Check if todo is undefined or if completed property is missing
  const isCompleted = todo?.completed ?? false;
    
  //state for edit
  const [isEdit,setEdit] = useState(false);
  const [title,setTitle] = useState(todo.title)

  let handleUpdate = (e) =>{
    e.preventDefault()
    let update = {
        id : todo.id,
        title,
        completed : todo.completed
      }
      updateTodo(update);
      setEdit(false)
  }

  
  return (
    <div>
      <li className="todo-item-container">
        <div className="todo-item">
          <input type="checkbox" />
          {!isEdit && <span onDoubleClick={()=>{setEdit(true)}} className={`todo-item-label ${isCompleted ? 'line-through' : ''}`} >
            {todo.title}
          </span>}
        {isEdit && 
        <form onSubmit={handleUpdate}>        
            <input type="text" className="todo-item-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </form>       
        }
        </div>
        <button className="x-button" onClick={()=>deleteTodo(todo.id)}>
          <svg
            className="x-button-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </li>
    </div>
  );
}
