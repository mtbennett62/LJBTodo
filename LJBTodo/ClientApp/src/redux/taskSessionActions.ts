import { TaskSession } from "../types/taskSession";

export type TaskSessionAction = | { type: 'SET_TASK_SESSIONS', payload: TaskSession[] } | { type: 'ADD_TASK_SESSION', payload: TaskSession }
 | { type: 'DELETE_TASK_SESSION', payload: number } | { type: 'UPDATE_TASK_SESSION', payload: TaskSession } 
 |{ type: 'ADD_TASKS_TO_SESSION', payload: { sessionId: number, taskIds: number[] } } | { type: 'REMOVE_TASKS_FROM_SESSION', payload: { sessionId: number, taskIds: number[] } };

export const setTaskSessions = (taskSessions: TaskSession[]) => {
    return {
        type: 'SET_TASK_SESSIONS',
        payload: taskSessions
    };
};

export const addTaskSession = (taskSession: TaskSession) => {
    return {
        type: 'ADD_TASK_SESSION',
        payload: taskSession
    };
};

export const deleteTaskSession = (id: number) => {
    return {
        type: 'DELETE_TASK_SESSION',
        payload: id
    };
};

export const updateTaskSession = (taskSession: TaskSession) => {
    return {
        type: 'UPDATE_TASK_SESSION',
        payload: taskSession
    };
};

export const addTasksToSession = (sessionId: number, taskIds: number[]) => {
    return {
        type: 'ADD_TASKS_TO_SESSION',
        payload: { sessionId, taskIds }
    };
};

export const removeTasksFromSession = (sessionId: number, taskIds: number[]) => {
    return {
        type: 'REMOVE_TASKS_FROM_SESSION',
        payload: { sessionId, taskIds }
    };
};

