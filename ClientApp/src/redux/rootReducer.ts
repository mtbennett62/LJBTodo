import { categoryReducer } from "./categoryReducer";
import { priorityReducer } from "./priorityReducer";
import { todoReducer } from "./todoReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({todo: todoReducer, priority: priorityReducer, category: categoryReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;