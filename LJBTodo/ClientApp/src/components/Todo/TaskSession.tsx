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
import { Box, Button, Flex, Section, Checkbox, Text, Progress } from "@radix-ui/themes";
import '../radix-styles/radix-components.scss';
import TaskItem from "./TaskItem";
import { useTodoCallbacks } from "./todoCallbacks";
import { useTaskSessionCallbacks } from "./taskSessionCallbacks";
import { TrashIcon } from "@radix-ui/react-icons";
import ConfirmDialogButton from "../Shared/ConfirmDialogButton";

const TaskSessions = () => {
    const { taskSessions, taskSessionsLoaded } = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();
    const { getConfig } = useAuth();
    const { addSession, deleteSession } = useTaskSessionCallbacks();

    useEffect(() => {
        if (taskSessionsLoaded) {
            return;
        }
        axios.get(`${import.meta.env.VITE_API_URL}/api/taskSession`, getConfig()).then(response => {
            dispatch(setTaskSessions(response.data));
        });

    }, [taskSessionsLoaded]);

    useEffect(() => { }, [taskSessions]);

    const dateDisplay = (startDate: Date, endDate: Date) => {
        const extendedOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: '2-digit' };
        const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

        if (startDate && endDate && startDate.setHours(0, 0, 0, 0) - endDate.setHours(0, 0, 0, 0) !== 0) {
            const intlFormatter = new Intl.DateTimeFormat('en-GB', extendedOptions);
            return `${intlFormatter.format(startDate)} - ${intlFormatter.format(endDate)}`;
        }

        const now = new Date();
        const diffInDays = Math.floor((startDate.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return "Today";
        if (diffInDays === 1) return "Tomorrow";
        if (diffInDays === -1) return "Yesterday";

        const dayOfWeek = new Intl.DateTimeFormat('en-GB', options).format(startDate);

        const getWeekNumber = (date: Date) => {
            const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
            return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        };

        const nowWeekNumber = getWeekNumber(now);
        const dateWeekNumber = getWeekNumber(startDate);

        let dateString;
        if (nowWeekNumber === dateWeekNumber) dateString = dayOfWeek;
        else if (dateWeekNumber - nowWeekNumber === 1) dateString = `Next ${dayOfWeek}`;
        else if (dateWeekNumber - nowWeekNumber === -1) dateString = `Last ${dayOfWeek}`;
        else dateString = new Intl.DateTimeFormat('en-GB', extendedOptions).format(startDate);

        return dateString;
    };

    const getProgressByTasks = (taskSession: TaskSession) => {
        if (taskSession.todoItems.length === 0) return 0;
        const completedTasks = taskSession.todoItems.filter(task => task.isComplete);
        return (completedTasks.length / taskSession.todoItems.length) * 100;
    };

    return (
        <Box className="TaskSessionContainer">
            <Accordion.Root className="AccordionRoot" type="multiple">
                {taskSessions.map((taskSession: TaskSession) => (
                    <Accordion.Item className="AccordionItem" key={`tasksession-${taskSession.id}`} value={`tasksession-${taskSession.id}`}>
                        <Accordion.Trigger className="AccordionTrigger">
                            <Flex gap="3" className="SessionInfo">
                                <Text>{dateDisplay(new Date(taskSession.startDate), new Date(taskSession.endDate))} </Text>
                                <Text> {taskSession.todoItems.length} {taskSession.todoItems.length == 1 ? 'task' : 'tasks'}</Text>
                                <Text>Total Estimated Hours: {taskSession.todoItems.reduce((sum, item) => sum + (item.estimatedHours || 0), 0)}</Text>
                                {taskSession.todoItems.length > 0 && <Progress className="progress-bar " size="1" value={getProgressByTasks(taskSession)} />}
                            </Flex>
                            <Flex className="TaskOptions">
                                <AddTasksPopover taskSession={taskSession} />
                                <ConfirmDialogButton title="Delete session?" confirmAction={() => deleteSession(taskSession.id)} confirmText="This action is not reversible" confirmButtonText="Delete" cancelButtonText="Cancel" child={<Button variant="ghost" color="red"><TrashIcon /></Button>} />
                            </Flex>
                        </Accordion.Trigger>
                        <Accordion.Content className="AccordionContent Content">
                            <div className="TaskSessionContent">
                                <TaskSessionItem taskSession={taskSession} />
                            </div>
                        </Accordion.Content>
                    </ Accordion.Item>
                ))}
                <Accordion.Item className="AccordionItem new" value="new-taskSession">
                    <Accordion.Trigger className="AccordionTrigger">Add New Task Session</Accordion.Trigger>
                    <Accordion.Content className="AccordionContent">
                        <Form.Root
                            onSubmit={(event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                addSession(formData);
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
        </Box>
    );

};

const TaskSessionItem = ({ taskSession }: { taskSession: TaskSession }) => {
    const { handleTaskSave, deleteTodoItem, handleDueDateChange, toggleComplete } = useTodoCallbacks();

    useEffect(() => { }, [taskSession.todoItems]);

    return (
        <Box className="TaskSessionItem">
            {taskSession.todoItems.toSorted((a, b) => Number(a.isComplete) - Number(b.isComplete)).map((todoItem: TodoItem) => (
                <TaskItem key={`session-${taskSession.id}-task-${todoItem.id}`} isSession={true} todo={todoItem} deleteTodo={deleteTodoItem} handleDueDateChange={handleDueDateChange} handleTaskSave={handleTaskSave} toggleComplete={toggleComplete} />
            ))}
        </Box>
    );
};

const AddTasksPopover = ({ taskSession }: { taskSession: TaskSession }) => {
    return (
        <div onClick={(e) => e.preventDefault}>
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
        </div>
    )
};


const TaskSessionTaskList = ({ taskSession }: { taskSession: TaskSession }) => {
    const { todos } = useSelector((state: RootState) => state.todo);
    const { getConfig } = useAuth();
    const dispatch = useDispatch();

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

                const todosToAdd = todos.filter(todo => addedTaskIds.includes(todo.id));

                dispatch(addTasksToSession(taskSession.id, todosToAdd));
                dispatch(removeTasksFromSession(taskSession.id, removedTaskIds));
                setAddedIds([]);
                setRemovedIds([]);
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