import { Category } from "../components/Settings/Settings";
import { CategoryAction } from "./categoryActions";


export interface CategoryState {
    categories: Category[];
    categoriesLoaded: boolean;
};

const initialState: CategoryState = {
    categories: [],
    categoriesLoaded: false,
};

export const categoryReducer = (state = initialState, action: CategoryAction) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
                categoriesLoaded: true
            };
        case 'ADD_CATEGORY':
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        case 'UPDATE_CATEGORY':
            return {
                ...state,
                categories: state.categories.map(category => category.id === action.payload.id ? action.payload : category)
            };
        default:
            return state;
    }
};