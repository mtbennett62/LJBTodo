import { Comment } from "../types/comment";
import { TodoItem } from "../types/todo";

const SET_TODOS = 'SET_TODOS';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';

export type TodoAction = | { type: 'SET_TODOS', payload: TodoItem[] } |
{ type: 'ADD_TODO', payload: TodoItem } | { type: 'DELETE_TODO', payload: number } | { type: 'UPDATE_TODO', payload: TodoItem } | { type: 'ADD_COMMENT', payload: Comment } | { type: 'DELETE_COMMENT', payload: number };

export const setTodos = (todos: TodoItem[]) => {
    return {
        type: SET_TODOS,
        payload: todos
    };
};

export const addTodo = (todo: TodoItem) => {
    return {
        type: ADD_TODO,
        payload: todo
    };
};

export const deleteTodo = (id: number) => {
    return {
        type: DELETE_TODO,
        payload: id
    };
};

export const updateTodo = (todo: TodoItem) => {
    return {
        type: UPDATE_TODO,
        payload: todo
    };
};

export const setCommentsForTask = (comment: Comment) => {
    return {
        type: 'ADD_COMMENT',
        payload: comment 
    };
};

export const deleteComment = (commentId: number) => {
    return {
        type: 'DELETE_COMMENT',
        payload: commentId
    };
};