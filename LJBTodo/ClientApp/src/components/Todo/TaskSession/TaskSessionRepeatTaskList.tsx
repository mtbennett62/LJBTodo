import { Box, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import { TaskSession } from "../../../types/taskSession";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { useState } from "react";
import { useTaskSessionCallbacks } from "../taskSessionCallbacks";


const TaskSessionRepeatTaskList = ({ taskSession }: { taskSession: TaskSession }) => {
    const { repeatTemplates } = useSelector((state: RootState) => state.todo);
    const { addRepeatTasksToSession } = useTaskSessionCallbacks();

    const [addedIds, setAddedIds] = useState<number[]>([]);

    const handleCheckedChange = (selected: boolean, id: number) => {
        if (selected) {
            setAddedIds([...addedIds, id]);
        }
        else {
            setAddedIds(addedIds.filter(addedId => addedId !== id));
        }
    };

    const handleSave = () => {
        addRepeatTasksToSession(taskSession.id, addedIds);
    };

    return (
        <Flex>
            <Flex gap="3" direction="column" className="taskSessionList">
                {
                    repeatTemplates.map(template => (
                        <Box key={`task-${template.id}`}>
                            <Flex align="center" gap="2">
                                <Checkbox color="violet" checked={addedIds.includes(template.id)}
                                    onCheckedChange={(event) => {
                                        handleCheckedChange(event as boolean, template.id);
                                    }} />
                                <Text align="left" key={template.id}>{template.name}</Text>
                            </Flex>
                        </Box>
                    ))
                }
                <Box>
                    <Button color="violet" onClick={handleSave}>Save</Button>
                </Box>
            </Flex>
        </Flex>
    );
};

export default TaskSessionRepeatTaskList;