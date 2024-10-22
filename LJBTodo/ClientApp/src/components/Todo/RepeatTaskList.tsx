import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useEffect } from "react";
import { useAuth } from "../../provider/authProvider";
import axios from "axios";
import { setRepeatTaskTemplates } from "../../redux/todoActions";


const RepeatTaskList = () => {
    const {repeatTemplates, repeatTemplatesLoaded } = useSelector((state: RootState) => state.todo);
    const { getConfig } = useAuth();
    const dispatch = useDispatch();


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/todo/repeatTasks`, getConfig()).then(response => {
            dispatch(setRepeatTaskTemplates(response.data));
        });

    }, [repeatTemplatesLoaded]);

    // const 
    return (
        <div>
            <h2>Repeat Task Templates</h2>
            <ul>
                {repeatTemplates.map(template => (
                    <li key={template.id}>{template.name}</li>
                ))}
            </ul>
        </div>
    );

};
export default RepeatTaskList;