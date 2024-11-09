import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useEffect } from "react";
import { useAuth } from "../../provider/authProvider";
import axios from "axios";
import { addRepeatTaskTemplate, setRepeatTaskTemplates, updateRepeatTaskTemplate } from "../../redux/todoActions";
import * as Dialog from "@radix-ui/react-dialog";
import TaskForm from "./TaskForm";
import { PlusIcon } from "@radix-ui/react-icons";
import { RepeatTaskTemplate } from "../../types/repeatTaskTemplate";
import { Frequency } from "../../types/enums/frequency";



const RepeatTaskList = () => {
    const {repeatTemplates, repeatTemplatesLoaded } = useSelector((state: RootState) => state.todo);
    const { getConfig } = useAuth();
    const dispatch = useDispatch();
    // const { priorities } = useSelector((state: RootState) => state.priority);


    const emptyTemplate: RepeatTaskTemplate = {
        // default values
        id: 0,
        userGuid: '00000000-0000-0000-0000-000000000000',
        name: '',
        description: '',
        customFrequencyDays: 0,
        frequency: Frequency.AdHoc,
        priorityId: 1,
        // priority: priorities[0],
        mostRecentCompletion: undefined
    };

    const handleTemplateSave = (task: RepeatTaskTemplate, isUpdate: boolean) => {
        if (isUpdate) {
            dispatch(updateRepeatTaskTemplate(task));
        } else {
            dispatch(addRepeatTaskTemplate(task));
        }
    };



    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/todo/repeatTasks`, getConfig()).then(response => {
            dispatch(setRepeatTaskTemplates(response.data));
        });

    }, [repeatTemplatesLoaded]);

    return (
        <div>
            <h2>Repeat Task Templates</h2>
            <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button className="Button violet addTodo"><PlusIcon /></button>
                    </Dialog.Trigger>
                    <TaskForm todo={emptyTemplate} isEdit={false} handleTaskSave={handleTemplateSave} />
                </Dialog.Root>
            <ul>
                {repeatTemplates.map(template => (
                    <li key={template.id}>{template.name}</li>
                ))}
            </ul>
        </div>
    );

};
export default RepeatTaskList;