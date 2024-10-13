import * as Dialog from "@radix-ui/react-dialog";
import { MixerHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import '../radix-components.scss';
import 'react-datepicker/dist/react-datepicker.css'
import './Todo.scss';
import { useAuth } from "../../provider/authProvider";
import TaskForm from "./TaskForm";
import { TodoItem } from "../../types/todo";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, updateTodo, addTodo, deleteTodo } from "../../redux/todoActions";
import { setPriorities } from "../../redux/priorityActions";
import { setCategories } from "../../redux/categoryActions";
import { RootState } from "../../redux/rootReducer";
import * as Collapsible from "@radix-ui/react-collapsible";
import clsx from "clsx";

function Todo() {

    const dispatch = useDispatch();
    const { todos, todosLoaded } = useSelector((state: RootState) => state.todo);
    const { priorities, prioritiesLoaded } = useSelector((state: RootState) => state.priority);
    const { categories, categoriesLoaded } = useSelector((state: RootState) => state.category);

    const [selectedPriority, setSelectedPriority] = useState<number>();
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [filtersActive, setFiltersActive] = useState(false);

    const filteredTodos = useMemo(() => {
        if (!selectedPriority && !selectedCategory) {
            setFiltersActive(false);
            return todos;
        }
        setFiltersActive(true);

        return todos.filter((todo) => {
            const priorityMatch = !selectedPriority || todo.priorityId === selectedPriority;
            const categoryMatch = !selectedCategory || todo.categoryId === selectedCategory;
            return priorityMatch && categoryMatch;
        });
    }, [todos, selectedPriority, selectedCategory]);

    const handlePriorityChange = useCallback((priorityId: number) => {
        setSelectedPriority(priorityId);
    }, []);

    const handleCategoryChange = useCallback((categoryId: number) => {
        setSelectedCategory(categoryId);
    }, []);

    const { token } = useAuth();
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const emptyTodo: TodoItem = {
        id: 0,
        userGuid: '00000000-0000-0000-0000-000000000000',
        name: '',
        isComplete: false,
        dueDate: new Date(),
        priorityId: 1,
        priority: priorities[0],
        escalations: [],
        includedUsers: []
    };

    useEffect(() => {
        if (todosLoaded) return;
        axios.get('https://localhost:7174/api/todo', axiosConfig)
            .then(response => {
                dispatch(setTodos(response.data));
            })
            .catch(error => console.error('There was an error!', error));


    }, [todosLoaded]);

    useEffect(() => {
        if (prioritiesLoaded) return;
        axios.get('https://localhost:7174/api/todo/priorities', axiosConfig)
            .then(response => {
                dispatch(setPriorities(response.data));
            })
            .catch(error => console.error('There was an error!', error));
    }, [prioritiesLoaded]);

    useEffect(() => {
        if (!todosLoaded || !prioritiesLoaded) {
            return;
        }
        const todosWithPriority: TodoItem[] = todos.map(todo => {
            const priority = priorities.find(p => p.id === todo.priorityId);
            return { ...todo, priority };
        });

        dispatch(setTodos(todosWithPriority));
    }, [todosLoaded && prioritiesLoaded]);

    useEffect(() => {
        if (categoriesLoaded) return;
        axios.get('https://localhost:7174/api/todo/categories', axiosConfig)
            .then(response => {
                dispatch(setCategories(response.data));
            })
            .catch(error => console.error('There was an error!', error));
    }), [];

    const deleteTodoItem = useCallback((id: number) => {
        axios.delete(`https://localhost:7174/api/todo/${id}`, axiosConfig)
            .then(() => dispatch(deleteTodo(id)))
            .catch(error => console.error('There was an error!', error));
    }, [todos]);

    const toggleComplete = useCallback((todo: TodoItem) => {
        const updatedTodo = { ...todo, isComplete: !todo.isComplete };
        axios.put(`https://localhost:7174/api/todo/${todo.id}`, updatedTodo, axiosConfig)
            .then(() => dispatch(updateTodo(updatedTodo)))
            .catch(error => console.error('There was an error!', error));
    }, [todos]);


    const handleDueDateChange = useCallback((task: TodoItem, e: any) => {
        const updatedTodo = { ...task, dueDate: e };
        axios.put(`https://localhost:7174/api/todo/${task.id}`, updatedTodo, axiosConfig)
            .then(() => dispatch(updateTodo(updatedTodo)))
            .catch(error => console.error('There was an error!', error));
    }, [todos]);

    const handleTaskSave = useCallback((task: TodoItem, isUpdate: boolean) => {
        if (isUpdate) {
            dispatch(updateTodo(task));
        }
        else {
            dispatch(addTodo(task));
        }
    }, [todos]);

    return (
        <div className="TodoContainer">
            <h1>Todo List</h1>
            <div className="TaskHeader">
                <Collapsible.Root>
                    <Collapsible.Trigger asChild>
                        <span className={clsx('filtersTrigger', filtersActive && 'active')}>Filters <MixerHorizontalIcon /></span>
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="priority">Priority</label>
                            <select id="priority" className="Select Input" value={selectedPriority} onChange={e => handlePriorityChange(Number(e.target.value))}>
                                <option value={0}>All</option>
                                {priorities.length > 0 && priorities.map(priority => (
                                    <option key={priority.id} value={priority.id}>{priority.name}</option>
                                ))}
                            </select>
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="category">Category</label>
                            <select id="category" className="Select Input" value={selectedCategory} onChange={e => handleCategoryChange(Number(e.target.value))}>
                                <option value={0}>All</option>
                                {categories.length > 0 && categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </fieldset>
                    </Collapsible.Content>
                </Collapsible.Root>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button className="Button violet addTodo"><PlusIcon /></button>
                    </Dialog.Trigger>
                    <TaskForm todo={emptyTodo} isEdit={false} handleTaskSave={handleTaskSave} />
                </Dialog.Root>
            </div>



            <ul className="TaskList">
                {filteredTodos.map(todo => !todo.isComplete && (
                    <TaskItem key={`task-item-${todo.id}`} todo={todo} handleDueDateChange={handleDueDateChange} deleteTodo={deleteTodoItem} toggleComplete={toggleComplete} handleTaskSave={handleTaskSave} />
                ))}

                {filteredTodos.map(todo => todo.isComplete && (
                    <TaskItem key={`task-item-${todo.id}`} todo={todo} handleDueDateChange={handleDueDateChange} deleteTodo={deleteTodoItem} toggleComplete={toggleComplete} handleTaskSave={handleTaskSave} />
                ))}
            </ul>
        </div>
    );
}






export default Todo