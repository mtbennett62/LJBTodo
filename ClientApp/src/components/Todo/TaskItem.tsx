import { Priority } from "../../types/priority";
import { TodoItem } from "../../types/todo";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Badge } from "@radix-ui/themes";
import DatePicker from "react-datepicker";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import TaskForm from "./TaskForm";


type TaskItemProps = {
    todo: TodoItem;
    handleDueDateChange: (task: TodoItem, e: any) => void;
    toggleComplete: (todo: TodoItem) => void;
    deleteTodo: (id: number) => void;
    priorities: Priority[];
    handleTaskSave: (task: TodoItem, isUpdate: boolean) => void;
};

const TaskItem = ({ todo, handleDueDateChange, toggleComplete, deleteTodo, priorities, handleTaskSave }: TaskItemProps) => {

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
                    <TaskForm todo={todo} isEdit={true} priorities={priorities} handleTaskSave={handleTaskSave}/>
                </Dialog.Root>

                <div className="RightContent">
                    <Badge className="priority" style={{ backgroundColor: todo.priority?.colourCode }}>{todo.priority?.name}</Badge>
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