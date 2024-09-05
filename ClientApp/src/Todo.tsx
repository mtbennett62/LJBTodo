import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon, Cross2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import './radix-components.scss';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import * as Checkbox from "@radix-ui/react-checkbox";
import './Todo.scss';
import { Badge } from "@radix-ui/themes";


type TodoItem = {
    id: number;
    userGuid: string;
    name: string;
    isComplete: boolean;
    dueDate: Date;
    description: string | null;
    priorityId: number;
    priority: Priority;
    escalations: any[];
    includedUsers: any[];
};

type Priority = {
    id: number;
    name: string;
    colourCode: string;
    orderPosition: number;
};


function Todo() {
    const [todos, setTodos] = useState<Array<any>>([]);
    const [priorities, setPriorities] = useState<Array<Priority>>([]);

    const [prioritiesLoaded, setPrioritiesLoaded] = useState<boolean>(false);
    const [todosLoaded, setTodosLoaded] = useState<boolean>(false);

    const emptyTodo: TodoItem = {
        id: 0,
        userGuid: '',
        name: '',
        isComplete: false,
        dueDate: new Date(),
        description: null,
        priorityId: 1,
        priority: priorities[0],
        escalations: [],
        includedUsers: [],
    }

    function handleDueDateChange(task: TodoItem, e: any) {
        const updatedTodo = { ...task, dueDate: e };
        axios.put(`https://localhost:7174/api/todo/${task.id}`, updatedTodo)
            .then(() => setTodos(todos.map(t => (t.id === task.id ? updatedTodo : t)))
            )
            .catch(error => console.error('There was an error!', error));
    }

    useEffect(() => {
        axios.get('https://localhost:7174/api/todo')
            .then(response => {
                setTodos(response.data);
                console.log("todos", response.data);
                setTodosLoaded(true);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    useEffect(() => {
        console.log("todosLoaded changed", todosLoaded)
    }, [todosLoaded]);

    useEffect(() => {
        axios.get('https://localhost:7174/api/todo/priorities')
            .then(response => {
                setPriorities(response.data);
                console.log("priorities", response.data);
                setPrioritiesLoaded(true);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    useEffect(() => {
        console.log("todosLoaded", todosLoaded, "prioritiesLoaded", prioritiesLoaded);
        if (!todosLoaded || !prioritiesLoaded) {
            return;
        }
        const todosWithPriority = todos.map(todo => {
            const priority = priorities.find(p => p.id === todo.priorityId);
            return { ...todo, priority };
        });
        console.log("todosWithPriority", todosWithPriority);

        setTodos(todosWithPriority);
    }, [todosLoaded, prioritiesLoaded]);

    const deleteTodo = (id: number) => {
        axios.delete(`https://localhost:7174/api/todo/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error('There was an error!', error));
    };

    const toggleComplete = (todo: TodoItem) => {
        const updatedTodo = { ...todo, isComplete: !todo.isComplete };
        axios.put(`https://localhost:7174/api/todo/${todo.id}`, updatedTodo)
            .then(() => setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t))))
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <div className="TodoContainer">
            <h1>Todo List</h1>


            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="Button violet"><PlusIcon /></button>
                </Dialog.Trigger>
                {/* <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                        <Dialog.Title className="DialogTitle">Add a new task</Dialog.Title>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="description">Description</label>
                            <input
                                id="description"
                                className="Input"
                                type="text"
                                value={newTodo.name}
                                onChange={handleTaskNameChange}
                            />
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="priority">Priority</label>
                            <select id="priority" className="Select Input" value={newTodo.priorityId} onChange={handleTaskPriorityChange}>
                                { priorities.map(priority => (
                                    <option key={priority.id} value={priority.id}>{priority.name}</option>
                                ))}
                            </select>
                        </fieldset>
                        <fieldset className="date-input">
                            <label className="Label" htmlFor="dueDate">Due Date</label>
                            <DatePicker className="Input" selected={newTodo.dueDate} onChange={(date: any) => setNewTodo({ ...newTodo, dueDate: date })} />
                        </fieldset>
                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Dialog.Close asChild>
                                <button className="Button green" onClick={addTodo}>Save</button>
                            </Dialog.Close>
                        </div>
                        <Dialog.Close asChild>
                            <button className="IconButton" aria-label="Close">
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal> */}
                <TaskForm todo={emptyTodo} isEdit={false} priorities={priorities} />
            </Dialog.Root>

            <ul className="TaskList">
                {todos.map(todo => !todo.isComplete && (
                    <TaskItem todo={todo} onclickHandler={() => toggleComplete(todo)} handleDueDateChange={() => handleDueDateChange} deleteTodo={() => deleteTodo} toggleComplete={() => toggleComplete} priorities={priorities} />
                ))}

                {todos.map(todo => todo.isComplete && (
                    <TaskItem todo={todo} onclickHandler={() => toggleComplete(todo)} handleDueDateChange={() => handleDueDateChange} deleteTodo={() => deleteTodo} toggleComplete={() => toggleComplete} priorities={priorities} />
                ))}
            </ul>
        </div>
    );
}

type TaskItemProps = {
    todo: TodoItem;
    onclickHandler: () => void;
    handleDueDateChange: (task: TodoItem, e: any) => void;
    toggleComplete: (todo: TodoItem) => void;
    deleteTodo: (id: number) => void;
    priorities: Priority[];
};

const TaskItem = ({ todo, onclickHandler, handleDueDateChange, toggleComplete, deleteTodo, priorities }: TaskItemProps) => {

    return (
        <li key={todo.id} className="TaskItem complete">
            <div
                onClick={() => onclickHandler}
                className={todo.isComplete ? "task complete" : "task active"}
            >
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <div className="LeftContent">
                            <span className="description">{todo.name}</span>
                        </div>
                    </Dialog.Trigger>
                    <TaskForm todo={todo} isEdit={true} priorities={priorities} />
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


type TaskFormProps = {
    todo: TodoItem;
    isEdit: boolean;
    priorities: Priority[];
}

const TaskForm = ({ todo, isEdit, priorities }: TaskFormProps) => {

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
            axios.put(`https://localhost:7174/api/todo/${taskItem.id}`, taskItem)
                .then(() => console.log("updated"))
                .catch(error => console.error('There was an error!', error));
        } else {
            axios.post('https://localhost:7174/api/todo', taskItem)
                .then(() => console.log("created"))
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
                        {priorities.map(priority => (
                            <option key={priority.id} value={priority.id}>{priority.name}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className="date-input">
                    <label className="Label" htmlFor="dueDate">Due Date</label>
                    <DatePicker className="Input" selected={taskItem.dueDate} onChange={(date: any) => setTaskItem({ ...taskItem, dueDate: date })} />
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

export default Todo