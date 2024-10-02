import * as Dialog from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useCallback, useEffect } from "react";
import '../radix-components.scss';
import 'react-datepicker/dist/react-datepicker.css'
import './Todo.scss';
import { useAuth } from "../../provider/authProvider";
import TaskForm from "./TaskForm";
import { TodoItem } from "../../types/todo";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, updateTodo, addTodo, deleteTodo } from "../../redux/todoActions";
import { setPriorities } from "../../redux/priorityActions";
import { RootState } from "../../redux/rootReducer";

function Todo() {

    const dispatch = useDispatch();
    const { todos, todosLoaded } = useSelector((state: RootState) => state.todo);
    const { priorities, prioritiesLoaded } = useSelector((state: RootState) => state.priority);
    
    const { token } = useAuth();
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const emptyTodo: TodoItem = {
        id: 0,
        userGuid: '00000000-0000-0000-0000-000000000000',
        name: '',
        isComplete: false,
        dueDate: new Date(),
        priorityId: 1,
        priority: priorities[0],
        escalations: [],
        includedUsers: []
    };

    useEffect(() => {
        if (todosLoaded) return;
        axios.get('https://localhost:7174/api/todo', axiosConfig)
            .then(response => {
                dispatch(setTodos(response.data));
            })
            .catch(error => console.error('There was an error!', error));


    }, [todosLoaded]);

    useEffect(() => {
        if (prioritiesLoaded) return;
        axios.get('https://localhost:7174/api/todo/priorities', axiosConfig)
            .then(response => {
                dispatch(setPriorities(response.data));
            })
            .catch(error => console.error('There was an error!', error));
    }, [prioritiesLoaded]);

    useEffect(() => {
        if (!todosLoaded || !prioritiesLoaded) {
            return;
        }
        const todosWithPriority: TodoItem[] = todos.map(todo => {
            const priority = priorities.find(p => p.id === todo.priorityId);
            return { ...todo, priority };
        });

        dispatch(setTodos(todosWithPriority));
    }, [todosLoaded && prioritiesLoaded]);

    const deleteTodoItem = useCallback((id: number) => {
        axios.delete(`https://localhost:7174/api/todo/${id}`, axiosConfig)
            .then(() => dispatch(deleteTodo(id)))
            .catch(error => console.error('There was an error!', error));
    }, [todos]);

    const toggleComplete = useCallback((todo: TodoItem) => {
        const updatedTodo = { ...todo, isComplete: !todo.isComplete };
        axios.put(`https://localhost:7174/api/todo/${todo.id}`, updatedTodo, axiosConfig)
            .then(() => dispatch(updateTodo(updatedTodo)))
            .catch(error => console.error('There was an error!', error));
    }, [todos]);


    const handleDueDateChange = useCallback((task: TodoItem, e: any) => {
        const updatedTodo = { ...task, dueDate: e };
        axios.put(`https://localhost:7174/api/todo/${task.id}`, updatedTodo, axiosConfig)
            .then(() => dispatch(updateTodo(updatedTodo)))
            .catch(error => console.error('There was an error!', error));
    }, [todos]);

    const handleTaskSave = useCallback((task: TodoItem, isUpdate: boolean) => {
        if (isUpdate) {
            dispatch(updateTodo(task));
        }
        else {
            dispatch(addTodo(task));
        }
    }, [todos]);

    return (
        <div className="TodoContainer">
            <h1>Todo List</h1>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="Button violet"><PlusIcon /></button>
                </Dialog.Trigger>
                <TaskForm todo={emptyTodo} isEdit={false} priorities={priorities} handleTaskSave={handleTaskSave} />
            </Dialog.Root>

            <ul className="TaskList">
                {todos.map(todo => !todo.isComplete && (
                    <TaskItem key={`task-item-${todo.id}`} todo={todo} handleDueDateChange={handleDueDateChange} deleteTodo={deleteTodoItem} toggleComplete={toggleComplete} priorities={priorities} handleTaskSave={handleTaskSave} />
                ))}

                {todos.map(todo => todo.isComplete && (
                    <TaskItem key={`task-item-${todo.id}`} todo={todo} handleDueDateChange={handleDueDateChange} deleteTodo={deleteTodoItem} toggleComplete={toggleComplete} priorities={priorities} handleTaskSave={handleTaskSave} />
                ))}
            </ul>
        </div>
    );
}






export default Todo