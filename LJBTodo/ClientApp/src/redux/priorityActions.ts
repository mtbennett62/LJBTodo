import { Priority } from "../types/priority";


export type PriorityAction = | {type: "SET_PRIORITIES", payload: Priority[]} | {type: "ADD_PRIORITY", payload: Priority} | {type: "UPDATE_PRIORITY", payload: Priority};

export const setPriorities = (priorities: Priority[]) => {
    return {
        type: "SET_PRIORITIES",
        payload: priorities
    };
};

export const addNewPriority = (priority: Priority) => {
    return {
        type: "ADD_PRIORITY",
        payload: priority
    };
};

export const updatePriority = (priority: Priority) => {
    return {
        type: "UPDATE_PRIORITY",
        payload: priority
    };
};