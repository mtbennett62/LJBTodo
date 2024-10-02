import { priorityReducer } from "./priorityReducer";
import { todoReducer } from "./todoReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({todo: todoReducer, priority: priorityReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;