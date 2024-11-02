import { TodoItem } from "../../types/todo";
// import * as Checkbox from "@radix-ui/react-checkbox";
import { Badge, Button, Checkbox } from "@radix-ui/themes";
import DatePicker from "react-datepicker";
import { LapTimerIcon, TrashIcon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import TaskForm from "./TaskForm";
import { Category } from "../../types/category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useEffect, useState } from "react";
import { Priority } from "../../types/priority";
import { updateTodo } from "../../redux/todoActions";
import TaskComments from "./TaskComments";
import ConfirmDialogButton from "../Shared/ConfirmDialogButton";


type TaskItemProps = {
    todo: TodoItem;
    handleDueDateChange: (task: TodoItem, e: any) => void;
    toggleComplete: (todo: TodoItem) => void;
    deleteTodo: (id: number) => void;
    handleTaskSave: (task: TodoItem, isUpdate: boolean) => void;
    isSession?: boolean;
};

const TaskItem = ({ todo, handleDueDateChange, toggleComplete, deleteTodo, handleTaskSave, isSession }: TaskItemProps) => {
    const dispatch = useDispatch();
    const { categories, categoriesLoaded } = useSelector((state: RootState) => state.category);
    const { priorities, prioritiesLoaded } = useSelector((state: RootState) => state.priority);
    const { taskSessions, taskSessionsLoaded } = useSelector((state: RootState) => state.session);
    const [isInSession, setIsInSession] = useState(false);

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

    useEffect(() => {
        if (taskSessionsLoaded) {
            setIsInSession(taskSessions.some(session => session.todoItems.some(task => task.id === todo.id)));
        }
    }, [taskSessionsLoaded, taskSessions, todo]);
    
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
                    {!isSession && isInSession && <Badge title="Assigned to a session" variant="soft" color="gray" radius="full" className="sessionBadge"><LapTimerIcon /></Badge>}
                    <TaskComments todoItem={todo} />
                    {todo.estimatedHours && <Badge variant="solid" color="gray" radius="large" className="estimatedHours">{todo.estimatedHours}h</Badge>}
                    {todo.category && <Badge className="category">{todo.category.name}</Badge>}
                    {todo.priority && <Badge className="priority" style={{ backgroundColor: todo.priority?.colourCode }}>{todo.priority?.name}</Badge>}
                    <DatePicker className="Input" placeholderText="Add due date" selected={todo.dueDate} onChange={(date: any) => handleDueDateChange(todo, date)} />
                    <Checkbox size="3" checked={todo.isComplete} onCheckedChange={() => toggleComplete(todo)} /> 
                    <ConfirmDialogButton child={<Button variant="ghost" color="red"><TrashIcon /></Button>} confirmAction={() => deleteTodo(todo.id)}  
                    confirmButtonText="Delete" title="Delete task?" confirmText="This action is not reversible"/>
                </div>
            </div>

        </li>
    )
}

export default TaskItem;