import { Box } from "@radix-ui/themes";
import { useEffect } from "react";
import { TaskSession } from "../../../types/taskSession";
import { TodoItem } from "../../../types/todo";
import TaskItem from "../TaskItem";
import { useTodoCallbacks } from "../todoCallbacks";

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

export default TaskSessionItem;