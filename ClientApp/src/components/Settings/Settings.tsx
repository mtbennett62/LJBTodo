import { Tabs } from "@radix-ui/themes";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Priority } from "../../types/priority";
import './Settings.scss';
import { PlusIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../provider/authProvider";

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

type Category = {
    id: number;
    name: string;
    parentCategoryId: number | null;
};
const CategorySettings = () => {
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [newCategory, setNewCategory] = useState<string>('');
    const { token } = useAuth();
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.get('https://localhost:7174/api/todo/categories', axiosConfig)
            .then(response => setCategories(response.data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    const addCategory = () => {
        axios.post('https://localhost:7174/api/todo/categories', { name: newCategory }, axiosConfig)
            .then(response => {
                setCategories([...categories, response.data])
                setNewCategory('');
            })
            .catch(error => console.error('There was an error!', error));
    };

    const updateParentCategory = useCallback((value: number, category: Category) => {
        axios.put(`https://localhost:7174/api/todo/categories/${category.id}`, { ...category, parentCategoryId: value }, axiosConfig)
            .then(response => {
                setCategories(categories.map(c => c.id === category.id ? response.data : c));
            })
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
                    <button type="submit" onClick={addCategory}><PlusIcon /></button>
                </div>
            </div>
        </>

    );
};

function PrioritySettings() {
    const [priorities, setPriorities] = useState<Array<Priority>>([]);
    const [newPriority, setNewPriority] = useState<string>('');
    const { token } = useAuth();
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.get('https://localhost:7174/api/todo/priorities', axiosConfig)
            .then(response => setPriorities(response.data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    const addPriority = () => {
        axios.post('https://localhost:7174/api/todo/priorities', { name: newPriority }, axiosConfig)
            .then(response => {
                setPriorities([...priorities, response.data])
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