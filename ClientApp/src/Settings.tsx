import { Tabs } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { Priority } from "./types/priority";

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

    useEffect(() => {
        axios.get('https://localhost:7174/api/todo/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    const addCategory = () => {
        axios.post('https://localhost:7174/api/todo/categories', { name: newCategory })
            .then(response => {
                setCategories([...categories, response.data])
                setNewCategory('');
            })
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <div>
            {categories.map((category, index) => (
                <div key={index}>{category.name}</div>
            ))}
            <input type="text" placeholder="New category" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
            <button type="submit" onClick={addCategory}>Add</button>
        </div>
    );
};

function PrioritySettings() {
    const [priorities, setPriorities] = useState<Array<Priority>>([]);

    useEffect(() => {
        axios.get('https://localhost:7174/api/todo/priorities')
            .then(response => setPriorities(response.data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <div>
            {priorities.map((priority, index) => (
                <div key={index}>{priority.name}</div>
            ))}
        </div>
    );
}


export default Settings;