import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        axios.get('https://localhost:5001/api/todo')
            .then(response => setTodos(response.data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    const addTodo = () => {
        axios.post('https://localhost:5001/api/todo', { name: newTodo, isComplete: false })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('There was an error!', error));
        setNewTodo('');
    };

    const deleteTodo = (id) => {
        axios.delete(`https://localhost:5001/api/todo/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error('There was an error!', error));
    };

    const toggleComplete = (todo) => {
        const updatedTodo = { ...todo, isComplete: !todo.isComplete };
        axios.put(`https://localhost:5001/api/todo/${todo.id}`, updatedTodo)
            .then(() => setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t))))
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            onClick={() => toggleComplete(todo)}
                            style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}
                        >
                            {todo.name}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
