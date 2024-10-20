import { useState } from "react";
import { useAuth } from "../../provider/authProvider";
import { TodoItem } from "../../types/todo";
import axios from "axios";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";



type TaskFormProps = {
    todo: TodoItem;
    isEdit: boolean;
    handleTaskSave: (task: TodoItem, isUpdate: boolean) => void;
}

const TaskForm = ({ todo, isEdit, handleTaskSave }: TaskFormProps) => {

    const { priorities } = useSelector((state: RootState) => state.priority);

    const { getConfig } = useAuth();
    const { categories } = useSelector((state: RootState) => state.category);

    const [taskItem, setTaskItem] = useState<TodoItem>({ ...todo });

    function handleTaskNameChange(e: any) {
        setTaskItem({
            ...taskItem,
            name: e.target.value
        });
    }

    function handleTaskPriorityChange(e: any) {
        setTaskItem({
            ...taskItem,
            priorityId: e.target.value
        });
    }

    function save() {
        if (isEdit) {
            axios.put(`${import.meta.env.VITE_API_URL}/api/todo/${taskItem.id}`, taskItem, getConfig())
                .then(() => {
                    handleTaskSave(taskItem, true);
                })
                .catch(error => console.error('There was an error!', error));
        } else {
            axios.post(`${import.meta.env.VITE_API_URL}/api/todo`, taskItem, getConfig())
                .then((response) => {
                    handleTaskSave(response.data, false);
                })
                .catch(error => console.error('There was an error!', error));
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent" aria-description="task form">
                <Dialog.Title className="DialogTitle">Add a new task</Dialog.Title>
                <Dialog.Description className="DialogDescription">Please fill in the details below</Dialog.Description>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="description">Description</label>
                    <input
                        id="description"
                        className="Input"
                        type="text"
                        value={taskItem.name}
                        onChange={handleTaskNameChange}
                    />
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="priority">Priority</label>
                    <select id="priority" className="Select Input" value={taskItem.priorityId} onChange={handleTaskPriorityChange}>
                        {priorities.length > 0 && priorities.map(priority => (
                            <option key={priority.id} value={priority.id}>{priority.name}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="category">Category</label>
                    <select id="category" className="Select Input" value={taskItem.categoryId} onChange={(e: any) => setTaskItem({ ...taskItem, categoryId: e.target.value })}>
                        {categories.length > 0 && categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className="date-input">
                    <label className="Label" htmlFor="dueDate">Due Date</label>
                    <DatePicker className="Input" selected={taskItem.dueDate} onChange={(date: any) => setTaskItem({ ...taskItem, dueDate: date })} />
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="description">Description</label>
                    <textarea
                        placeholder="Add description"
                        id="description"
                        className="Input"
                        defaultValue={taskItem.description}
                        onChange={(e: any) => setTaskItem({ ...taskItem, description: e.target.value })}
                    />
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="estimatedHours">Estimated Hours</label>
                    <input
                        placeholder="Add estimate"
                        id="estimatedHours"
                        className="Input"
                        type="number"
                        defaultValue={taskItem.estimatedHours}
                        onChange={(e: any) => e.target.value && setTaskItem({ ...taskItem, estimatedHours: e.target.value })} />
                </fieldset>
                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                    <Dialog.Close asChild>
                        <button className="Button green" onClick={save}>Save</button>
                    </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default TaskForm;