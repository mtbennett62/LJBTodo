import { Priority } from "../types/priority";
import { PriorityAction } from "./priorityActions";

export interface PriorityState {
    priorities: Priority[];
    prioritiesLoaded: boolean;
}

const initialState: PriorityState = {
    priorities: [],
    prioritiesLoaded: false,
};

export const priorityReducer = (state = initialState, action: PriorityAction) => {

    switch (action.type) {
        case 'SET_PRIORITIES':
            return {
                ...state,
                priorities: action.payload,
                prioritiesLoaded: true
            };
        case 'ADD_PRIORITY':
            return {
                ...state,
                priorities: [...state.priorities, action.payload]
            };
        case 'UPDATE_PRIORITY':
            return {
                ...state,
                priorities: state.priorities.map(priority => priority.id === action.payload.id ? action.payload : priority)
            };
        default:
            return state;

    }
};