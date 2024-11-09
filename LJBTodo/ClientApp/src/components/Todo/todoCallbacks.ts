import { useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { deleteTodo, updateTodo, addTodo } from "../../redux/todoActions";
import { TodoItem } from "../../types/todo";
import { useAuth } from "../../provider/authProvider";
import { updateTaskInSession } from "../../redux/taskSessionActions";

export const useTodoCallbacks = () => {
    const dispatch = useDispatch();
    const { getConfig } = useAuth();
    const { todos } = useSelector((state: RootState) => state.todo);

    const deleteTodoItem = useCallback((id: number) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/api/todo/${id}`, getConfig())
            .then(() => dispatch(deleteTodo(id)))
            .catch(error => console.error('There was an error!', error));
    }, [todos]);

    const toggleComplete = useCallback((todo: TodoItem) => {
        const updatedTodo = { ...todo, isComplete: !todo.isComplete };
        axios.put(`${import.meta.env.VITE_API_URL}/api/todo/${todo.id}`, updatedTodo, getConfig())
            .then(() => {
                dispatch(updateTodo(updatedTodo));
                dispatch(updateTaskInSession(updatedTodo));
            })
            .catch(error => console.error('There was an error!', error));
    }, [todos]);

    const handleDueDateChange = useCallback((task: TodoItem, e: any) => {
        const updatedTodo = { ...task, dueDate: e };
        axios.put(`${import.meta.env.VITE_API_URL}/api/todo/${task.id}`, updatedTodo, getConfig())
            .then(() => {
                dispatch(updateTodo(updatedTodo))
                dispatch(updateTaskInSession(updatedTodo));
            })
            .catch(error => console.error('There was an error!', error));
    }, [todos]);

    const handleTaskSave = useCallback((task: TodoItem, isUpdate: boolean) => {
        if (isUpdate) {
            dispatch(updateTodo(task));
        } else {
            dispatch(addTodo(task));
        }
        dispatch(updateTaskInSession(task));
    }, [todos]);

    return {
        deleteTodoItem,
        toggleComplete,
        handleDueDateChange,
        handleTaskSave
    };
};