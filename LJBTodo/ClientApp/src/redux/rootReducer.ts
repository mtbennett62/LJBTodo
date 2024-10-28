import { categoryReducer } from "./categoryReducer";
import { priorityReducer } from "./priorityReducer";
import { spacesReducer } from "./spacesReducer";
import { taskSessionReducer } from "./taskSessionReducer";
import { todoReducer } from "./todoReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({todo: todoReducer, priority: priorityReducer, category: categoryReducer, space: spacesReducer, session: taskSessionReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;