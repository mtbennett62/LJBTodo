import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { TodoItem } from "../../types/todo";
// import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import axios from "axios";
import { Comment } from "../../types/comment";
import { useDispatch } from "react-redux";
import { useAuth } from "../../provider/authProvider";
import { Button, Popover, Text, TextField } from "@radix-ui/themes";
import '../radix-components.scss';


export type TaskCommentsProps = {
    todoItem: TodoItem;
};

const TaskComments = ({ todoItem }: TaskCommentsProps) => {
    const dispatch = useDispatch();
    const { getConfig } = useAuth();

    const [newComment, setNewComment] = useState<string>('');

    const saveComment = () => {
        console.log('save comment');
        axios.post(`https://localhost:7174/api/todo/comment`, { text: newComment, todoItemId: todoItem.id }, getConfig()).then(response => {
            const comment: Comment = response.data;
            dispatch({ type: 'ADD_COMMENT', payload: comment });
            setNewComment('');
        })
    };

    return (
        <Popover.Root >
            <Popover.Trigger>
                <Button className="comment-button" color="violet" variant={todoItem.comments?.length ? "soft" : "ghost"} ><ChatBubbleIcon  width="12" height="12" /></Button>
            </Popover.Trigger>
            <Popover.Content size="1" className="PopoverContent comment-modal">
                <TextField.Root size="3" placeholder="Add a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} >
                    <TextField.Slot side="right" px="1">
                        <Button variant="soft" size="2" highContrast disabled={newComment.length < 3} type="submit" onClick={saveComment}>Save</Button>
                    </TextField.Slot>
                </TextField.Root>
                {todoItem.comments && todoItem.comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <Text className="comment-text">
                            {comment.text}
                        </Text>
                        <Text weight="light" size="1" className="comment-date">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </Text>
                    </div>
                ))}
            </Popover.Content>
        </Popover.Root>
    );
};

export default TaskComments;