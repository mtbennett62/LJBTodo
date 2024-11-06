import axios from "axios";
import { TaskSession } from "../../types/taskSession";
import { useAuth } from "../../provider/authProvider";
import { useDispatch, useSelector } from "react-redux";
import { setTaskSessions, deleteTaskSession, addTasksToSession } from "../../redux/taskSessionActions";
import { RootState } from "../../redux/rootReducer";
import { setTodos } from "../../redux/todoActions";


export const useTaskSessionCallbacks = () => {
    const { getConfig } = useAuth();
    const dispatch = useDispatch();
    const { taskSessions } = useSelector((state: RootState) => state.session);
    const { todos } = useSelector((state: RootState) => state.todo);

    const addSession = (formData: FormData) => {
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

    const deleteSession = (id: number) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/api/taskSession/${id}`, getConfig())
            .then(() => {
                dispatch(deleteTaskSession(id));
            });
    };

    const addRepeatTasksToSession = (id: number, templateIds: number[]) => {
        axios.post(`${import.meta.env.VITE_API_URL}/api/taskSession/addRepeats/${id}`, templateIds, getConfig())
        .then(response => {
            console.log('addRepeatTaskToSession response', response);
            dispatch(setTodos([...todos, response.data.addedTodoItems]));
            dispatch(addTasksToSession(id, response.data.addedTodoItems));
        }); 
    };

    return {
        addSession,
        deleteSession,
        addRepeatTasksToSession
    }

};