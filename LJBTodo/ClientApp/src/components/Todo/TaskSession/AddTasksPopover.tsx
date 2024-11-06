import { Button } from "@radix-ui/themes";
import * as Popover from "@radix-ui/react-popover";
import { TaskSession } from "../../../types/taskSession";
import TaskSessionTaskList from "./TaskSessionTaskList";
import TaskSessionRepeatTaskList from "./TaskSessionRepeatTaskList";

const AddTasksPopover = ({ taskSession, isRepeat }: { taskSession: TaskSession, isRepeat: boolean }) => {
    return (
        <div onClick={(e) => e.preventDefault}>
            <Popover.Root modal>
                <Popover.Trigger>
                    <Button size="1" variant="soft">{isRepeat ? 'Add recurring task' :  'Add tasks'}</Button>
                </Popover.Trigger>
                <Popover.Portal container={document.getElementsByClassName('radix-themes')[0]}>
                    <Popover.Content className="PopoverContent">
                        {isRepeat ?
                            <TaskSessionRepeatTaskList taskSession={taskSession} />
                            : <TaskSessionTaskList taskSession={taskSession} />}
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    )
};

export default AddTasksPopover;