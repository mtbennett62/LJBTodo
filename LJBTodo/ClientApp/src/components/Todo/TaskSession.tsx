import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useEffect, useState } from "react";
import { useAuth } from "../../provider/authProvider";
import axios from "axios";
import { TaskSession } from "../../types/taskSession";
import { TodoItem } from "../../types/todo";
import { addTasksToSession, removeTasksFromSession, setTaskSessions } from "../../redux/taskSessionActions";
import * as Accordion from "@radix-ui/react-accordion";
import * as Form from "@radix-ui/react-form";
import * as Popover from "@radix-ui/react-popover";
import { Box, Button, Flex, Section, Checkbox } from "@radix-ui/themes";
import "../radix-components.scss";
import TaskItem from "./TaskItem";
import { useTodoCallbacks } from "./todoCallbacks";

const TaskSessions = () => {
    const { taskSessions, taskSessionsLoaded } = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();
    const { getConfig } = useAuth();

    useEffect(() => {
        if (taskSessionsLoaded) {
            return;
        }
        axios.get(`${import.meta.env.VITE_API_URL}/api/taskSession`, getConfig()).then(response => {
            dispatch(setTaskSessions(response.data));
        });

    }, [taskSessionsLoaded]);

    useEffect(() => {}, [taskSessions]);


    const addTaskSession = (formData: FormData) => {
        const newTaskSession: TaskSession = {
            id: 0,
            startDate: new Date(formData.get('start') as string),
            endDate: new Date(formData.get('end') as string),
            todoItems: []
        };
        axios.post(`${import.meta.env.VITE_API_URL}/api/taskSession`, newTaskSession, getConfig())
            .then(response => {
                dispatch(setTaskSessions([...taskSessions, response.data]));
            });
    };



    return (
        <>

            <Accordion.Root type="multiple">
                {taskSessions.map((taskSession: TaskSession) => (
                    <Accordion.Item className="TaskSessionAccordion Item" key={`tasksession-${taskSession.id}`} value={`tasksession-${taskSession.id}`}>
                        <Accordion.Trigger>{taskSession.startDate.toString()}</Accordion.Trigger>
                        <AddTasksPopover taskSession={taskSession} />
                        <Accordion.Content className="TaskSessionAccordion Content">
                            <TaskSessionItem taskSession={taskSession} />
                        </Accordion.Content>
                    </ Accordion.Item>
                ))}
                <Accordion.Item value="new-taskSession">
                    <Accordion.Trigger>Add New Task Session</Accordion.Trigger>
                    <Accordion.Content>
                        <Form.Root
                            onSubmit={(event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                console.log("form data", formData);
                                addTaskSession(formData);
                            }}
                        >
                            <Form.Field name="start">
                                <Form.Label>Start</Form.Label>
                                <Form.Control asChild>
                                    <input type="date" />
                                </Form.Control>
                            </Form.Field>
                            <Form.Field name="end">
                                <Form.Label>End</Form.Label>
                                <Form.Control asChild>
                                    <input type="date" />
                                </Form.Control>
                            </Form.Field>

                            <Form.Submit asChild>
                                <button type="submit">Add</button>
                            </Form.Submit>

                        </Form.Root>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </>
    );

};

const TaskSessionItem = ({ taskSession }: { taskSession: TaskSession }) => {
    const { handleTaskSave, deleteTodoItem, handleDueDateChange, toggleComplete } = useTodoCallbacks();

useEffect(() => {}, [taskSession.todoItems]);

    return (
        <Box className="TaskSessionItem">
            
            {taskSession.todoItems.map((todoItem: TodoItem) => (
                <TaskItem key={`session-${taskSession.id}-task-${todoItem.id}`} todo={todoItem} deleteTodo={deleteTodoItem} handleDueDateChange={handleDueDateChange} handleTaskSave={handleTaskSave} toggleComplete={toggleComplete} />
            ))}
        </Box>
    );
};

const AddTasksPopover = ({ taskSession }: { taskSession: TaskSession }) => {
    return (
<Popover.Root modal>
                <Popover.Trigger>
                    <Button size="1" variant="soft">Add tasks</Button>
                </Popover.Trigger>
                <Popover.Portal container={document.getElementsByClassName('radix-themes')[0]}>

                    <Popover.Content className="PopoverContent">
                        <TaskSessionTaskList taskSession={taskSession} />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
)};


const TaskSessionTaskList = ({ taskSession }: { taskSession: TaskSession }) => {
    const { todos } = useSelector((state: RootState) => state.todo);
    const { getConfig } = useAuth();
    const dispatch = useDispatch();


    console.log("task session", taskSession);


    const [selectableTodos, setSelectableTodos] = useState<TodoItem[]>([]);
    const [addedTaskIds, setAddedIds] = useState<number[]>([]);
    const [removedTaskIds, setRemovedIds] = useState<number[]>([]);

    useEffect(() => {
        setSelectableTodos(todos.filter(todo => !todo.isComplete || taskSession.todoItems.some(task => task.id === todo.id)));
    }, [taskSession.todoItems, todos]);

    const handleCheckedChange = (selected: boolean, id: number) => {
        if (selected) {
            if (taskSession.todoItems.some(task => task.id === id)) {
                setRemovedIds(removedTaskIds.filter(removedId => removedId !== id));
            }
            else {
                setAddedIds([...addedTaskIds, id]);
            }
        }
        else {
            if (taskSession.todoItems.some(task => task.id === id)) {
                setRemovedIds([...removedTaskIds, id]);
            }
            else {
                setAddedIds(addedTaskIds.filter(addedId => addedId !== id));
            }
        }
    };

    const handleSave = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/api/taskSession/updatetasks`, { taskSessionId: taskSession.id, addedTaskIds, removedTaskIds }, getConfig())
            .then(() => {
                console.log("added", addedTaskIds);
                console.log("removed", removedTaskIds);

                const todosToAdd = todos.filter(todo => addedTaskIds.includes(todo.id));

                dispatch(addTasksToSession(taskSession.id, todosToAdd));
                dispatch(removeTasksFromSession(taskSession.id, removedTaskIds));
                setAddedIds([]);
                setRemovedIds([]);

                //TODO: update task session in redux and make sure it gets reflected in the ui
                

                console.log("task session", taskSession);
                console.log("task session todo items", taskSession.todoItems);
            });

    };

    function isChecked(id: number) {
        return (taskSession.todoItems.some(task => task.id === id) || addedTaskIds.includes(id)) && !removedTaskIds.includes(id);
    }

    return (
        <Flex gap="3">
            <ul className="taskSessionList">
                {
                    selectableTodos.map((todoItem: TodoItem) => (
                        <Box key={`task-${todoItem.id}`}>
                            <Flex gap="1">

                                <Checkbox color="orange" checked={isChecked(todoItem.id)}
                                    onCheckedChange={(event) => {
                                        handleCheckedChange(event as boolean, todoItem.id);
                                    }} />
                                <li key={todoItem.id}>{todoItem.name}</li>
                            </Flex>

                        </Box>
                    ))}
                <Section>
                    <Button onClick={handleSave}>Save</Button>
                </Section>
            </ul>
        </Flex>
    );
};





export default TaskSessions;