import { Tabs } from "@radix-ui/themes";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import './Settings.scss';
import { PlusIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../provider/authProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { addNewPriority, setPriorities } from "../../redux/priorityActions";
import { addCategory, setCategories, updateCategory } from "../../redux/categoryActions";
import { Category } from "../../types/category";

function Settings() {
    return (
        <div>
            <h1>Settings</h1>

            <Tabs.Root defaultValue="categories">
                <Tabs.List>
                    <Tabs.Trigger value="categories">Categories</Tabs.Trigger>
                    <Tabs.Trigger value="priorities">Priorities</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="categories">
                    <CategorySettings />
                </Tabs.Content>
                <Tabs.Content value="priorities">
                    <PrioritySettings />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
}


const CategorySettings = () => {
    const {categories} = useSelector((state: RootState) => state.category);
    const [newCategory, setNewCategory] = useState<string>('');
    const { token } = useAuth();
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://localhost:7174/api/todo/categories', axiosConfig)
            .then(response => dispatch(setCategories(response.data)))
            .catch(error => console.error('There was an error!', error));
    }, []);

    const addNewCategory = () => {
        axios.post('https://localhost:7174/api/todo/categories', { name: newCategory }, axiosConfig)
            .then(response => {
                setCategories([...categories, response.data])
                dispatch(addCategory(response.data));
                setNewCategory('');
            })
            .catch(error => console.error('There was an error!', error));
    };

    const updateParentCategory = useCallback((value: number, category: Category) => {
        dispatch(updateCategory({...category, parentCategoryId: value}));

        axios.put(`https://localhost:7174/api/todo/categories/${category.id}`, { ...category, parentCategoryId: value }, axiosConfig)
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <>

            <div className="categoryContainer">
                {categories.map((category, index) => (
                    <div className="categoryItem" key={index}>
                        <span>{category.name}</span>
                        <div className="parentCategory">
                            <label htmlFor="parentCategory">Parent</label>
                            <select value={category.parentCategoryId ?? 0} onChange={e => updateParentCategory(parseInt(e.target.value), category)}>
                                <option value={0}>None</option>
                                {categories.map((category, index) => (
                                    <option key={`parent-category-option-${index}`} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
                <div className="new newCategory">
                    <input type="text" placeholder="New category" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
                    <button type="submit" onClick={addNewCategory}><PlusIcon /></button>
                </div>
            </div>
        </>

    );
};

function PrioritySettings() {
    const dispatch = useDispatch();
    const {priorities } = useSelector((state: RootState) => state.priority);
    const [newPriority, setNewPriority] = useState<string>('');
    const { token } = useAuth();
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.get('https://localhost:7174/api/todo/priorities', axiosConfig)
            .then(response => dispatch(setPriorities(response.data)))
            .catch(error => console.error('There was an error!', error));
    }, []);

    const addPriority = () => {
        axios.post('https://localhost:7174/api/todo/priorities', { name: newPriority }, axiosConfig)
            .then(response => {
                dispatch(addNewPriority(response.data));
                setNewPriority('');
            })
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <div>
            {priorities.map((priority, index) => (
                <div key={`priority-${index}`}>{priority.name}</div>
            ))}

            <div className="new newPriority">
                <input type="text" placeholder="New priority" value={newPriority} onChange={e => setNewPriority(e.target.value)} />
                <button type="submit" onClick={addPriority}><PlusIcon /></button>
            </div>
        </div>
    );
}


export default Settings;