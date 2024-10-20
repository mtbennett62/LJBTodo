import axios from "axios";
import { useAuth } from "../provider/authProvider";
import { TodoItem } from "../types/todo";


const { token } = useAuth();

const api = axios.create({
    baseURL: 'https://localhost:7174/',
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const apiEndpoints = {
    updateTodo: async function (todo: TodoItem) {
        return await api.put(`api/todo/${todo.id}`, todo);
    },
    createTodo: async function (todo: TodoItem) {
        return await api.post('api/todo', todo);
    },
    getTodos: async function () {
        return await api.get('api/todo');
    },
    deleteTodo: async function (id: number) {
        return await api.delete(`api/todo/${id}`);
    },
    getPriorities: async function () {
        return await api.get('api/todo/priorities');
    },


};