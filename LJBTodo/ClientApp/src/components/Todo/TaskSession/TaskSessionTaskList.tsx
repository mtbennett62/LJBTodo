import { Flex, Box, Checkbox, Button, Text } from "@radix-ui/themes";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../provider/authProvider";
import { RootState } from "../../../redux/rootReducer";
import { addTasksToSession, removeTasksFromSession } from "../../../redux/taskSessionActions";
import { TaskSession } from "../../../types/taskSession";
import { TodoItem } from "../../../types/todo";

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
        <Flex>
            <Flex gap="3" direction="column" className="taskSessionList">
                {
                    selectableTodos.map((todoItem: TodoItem) => (
                        <Box key={`task-${todoItem.id}`}>
                            <Flex align="center" gap="2">
                                <Checkbox color="violet" checked={isChecked(todoItem.id)}
                                    onCheckedChange={(event) => {
                                        handleCheckedChange(event as boolean, todoItem.id);
                                    }} />
                                <Text align="left" key={todoItem.id}>{todoItem.name}</Text>
                            </Flex>

                        </Box>
                    ))}
                <Box>
                    <Button color="violet" onClick={handleSave}>Save</Button>
                </Box>
            </Flex>
        </Flex>
    );
};

export default TaskSessionTaskList;