import { TaskSession } from "../types/taskSession";
import { TaskSessionAction } from "./taskSessionActions";

export interface TaskSessionState {
    taskSessions: TaskSession[];
    taskSessionsLoaded: boolean;
}

const initialState: TaskSessionState = {
    taskSessions: [],
    taskSessionsLoaded: false
};

export const taskSessionReducer = (state = initialState, action: TaskSessionAction) => {

    switch (action.type) {
        case 'SET_TASK_SESSIONS':
            return {
                ...state,
                taskSessions: action.payload,
                taskSessionsLoaded: true
            };
        case 'ADD_TASK_SESSION':
            return {
                ...state,
                taskSessions: [...state.taskSessions, action.payload]
            };
        case 'DELETE_TASK_SESSION':
            return {
                ...state,
                taskSessions: state.taskSessions.filter(taskSession => taskSession.id !== action.payload)
            };
        case 'UPDATE_TASK_SESSION':
            return {
                ...state,
                taskSessions: state.taskSessions.map(taskSession => taskSession.id === action.payload.id ? action.payload : taskSession)
            };
        case 'ADD_TASKS_TO_SESSION':
            return {
                ...state,
                taskSessions: state.taskSessions.map(taskSession => taskSession.id === action.payload.sessionId ? { ...taskSession, tasks: [...taskSession.todoItems, ...action.payload.taskIds] } : taskSession)
            };
        case 'REMOVE_TASKS_FROM_SESSION':
            return {
                ...state,
                taskSessions: state.taskSessions.map(taskSession => taskSession.id === action.payload.sessionId ? { ...taskSession, tasks: taskSession.todoItems.filter(task => !action.payload.taskIds.includes(task.id)) } : taskSession)
            };
        default:
            return state;
    }
};