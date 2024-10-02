import { Category } from "../components/Settings/Settings";

export type CategoryAction = | {type: "SET_CATEGORIES", payload: Category[]} | {type: "ADD_CATEGORY", payload: Category} | {type: "UPDATE_CATEGORY", payload: Category};

export const setCategories = (categories: Category[]) => {
    return {
        type: "SET_CATEGORIES",
        payload: categories
    };
};

export const addCategory = (category: Category) => {
    return {
        type: "ADD_CATEGORY",
        payload: category
    };
};

export const updateCategory = (category: Category) => {
    return {
        type: "UPDATE_CATEGORY",
        payload: category
    };
};