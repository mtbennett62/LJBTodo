import { TodoItem } from "../../types/todo";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Badge } from "@radix-ui/themes";
import DatePicker from "react-datepicker";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import TaskForm from "./TaskForm";
import { Category } from "../../types/category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useEffect } from "react";
import { Priority } from "../../types/priority";
import { updateTodo } from "../../redux/todoActions";


type TaskItemProps = {
    todo: TodoItem;
    handleDueDateChange: (task: TodoItem, e: any) => void;
    toggleComplete: (todo: TodoItem) => void;
    deleteTodo: (id: number) => void;
    handleTaskSave: (task: TodoItem, isUpdate: boolean) => void;
};

const TaskItem = ({ todo, handleDueDateChange, toggleComplete, deleteTodo, handleTaskSave }: TaskItemProps) => {
    const dispatch = useDispatch();
    const { categories, categoriesLoaded } = useSelector((state: RootState) => state.category);
    const { priorities, prioritiesLoaded } = useSelector((state: RootState) => state.priority);


    useEffect(() => {
        let isUpdated = false;
        let todoCopy = { ...todo };
        if (prioritiesLoaded && !todo.priority) {
            const priority = priorities.find((p: Priority) => p.id === todo.priorityId);
            if (priority) {
               todoCopy = { ...todoCopy, priority };
                isUpdated = true;
            }
        }
        if (categoriesLoaded && !todo.category) {
            const category = categories.find((c: Category) => c.id === todo.categoryId);
            if (category) {
                todoCopy = { ...todoCopy, category };
                isUpdated = true;
            }
        }
        if (isUpdated) {
            dispatch(updateTodo(todoCopy));
        }
    }, [prioritiesLoaded, categoriesLoaded, todo]);
    
    return (
        <li  className="TaskItem complete">
            <div
                className={todo.isComplete ? "task complete" : "task active"}
            >
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <div className="LeftContent">
                            <span className="description">{todo.name}</span>
                        </div>
                    </Dialog.Trigger>
                    <TaskForm todo={todo} isEdit={true} handleTaskSave={handleTaskSave}/>
                </Dialog.Root>

                <div className="RightContent">
                    {todo.estimatedHours && <Badge variant="solid" color="gray" radius="large" className="estimatedHours">{todo.estimatedHours}h</Badge>}
                    {todo.category && <Badge className="category">{todo.category.name}</Badge>}
                    {todo.priority && <Badge className="priority" style={{ backgroundColor: todo.priority?.colourCode }}>{todo.priority?.name}</Badge>}
                    <DatePicker className="Input" placeholderText="Add due date" selected={todo.dueDate} onChange={(date: any) => handleDueDateChange(todo, date)} />
                    <Checkbox.Root className="CheckboxRoot" checked={todo.isComplete} onCheckedChange={() => toggleComplete(todo)}>
                        <Checkbox.Indicator className="CheckboxIndicator"> <CheckIcon /></Checkbox.Indicator>
                    </Checkbox.Root>
                    <button onClick={() => deleteTodo(todo.id)}><TrashIcon /></button>
                </div>
            </div>

        </li>
    )
}

export default TaskItem;