import React, { useState } from 'react'

export default function TodoForm({addTodo}) {
    const [title,setTitle] = useState('')
    let handleSubmit =(e)=>{
        e.preventDefault()
        let Todo = {
            id : Math.random(),
            title,
           completed :false
        };
        addTodo(Todo)
        setTitle('')
    }
    return (
        <form action="#" onSubmit={handleSubmit}>
            <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            />
        </form>
    )
}
