import { TodoItem } from "../types/todo";
import { TodoAction } from "./todoActions";


export interface TodoState {
    todos: TodoItem[];
    todosLoaded: boolean;
}

const initialState: TodoState = {
    todos: [],
    todosLoaded: false,
};

export const todoReducer = (state = initialState, action: TodoAction) => {

    switch (action.type) {
        case 'SET_TODOS':
            return {
                ...state,
                todos: action.payload,
                todosLoaded: true
            };
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
            };
        case 'ADD_COMMENT':
            return {
                ...state, todos: state.todos.map(todo => todo.id === action.payload.todoItemId ? { ...todo, comments: [...(todo.comments || []), action.payload] } : todo)
            };
        case 'DELETE_COMMENT':
            return {
                ...state,
                todos: state.todos.map(todo => todo.comments ? { ...todo, comments: todo.comments.filter(comment => comment.id !== action.payload) } : todo)
            };
        default:
            return state;
    }
};