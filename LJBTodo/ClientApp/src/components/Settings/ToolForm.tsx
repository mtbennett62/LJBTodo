import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTool } from "../../redux/spacesActions";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";


const ToolForm = () => {
    const [toolName, setToolName] = useState("");
    const [toolDescription, setToolDescription] = useState("");
    const [toolImageUrl, setToolImageUrl] = useState("");
    const [spaceId, setSpaceId] = useState<number | null>(null);
    const dispatch = useDispatch();
    const { getConfig } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTool = {
            name: toolName,
            description: toolDescription,
            imageUrl: toolImageUrl,
            spaceId: spaceId ?? null,
        };

        axios.post(`${import.meta.env.VITE_API_URL}/tools`, newTool, getConfig()).then(response => {
            dispatch(addTool(response.data.spaceId, response.data));
            // reset form
            setToolName("");
            setToolDescription("");
            setToolImageUrl("");
            setSpaceId(null);

        });
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent" aria-description="tool form">
                <Dialog.Title className="DialogTitle">Add a new tool</Dialog.Title>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="toolName">Tool Name</label>
                        <input
                            type="text"
                            id="toolName"
                            name="toolName"
                            value={toolName}
                            onChange={(e) => setToolName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="toolDescription">Tool Description</label>
                        <textarea
                            id="toolDescription"
                            name="toolDescription"
                            value={toolDescription}
                            onChange={(e) => setToolDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="toolImageUrl">Tool Image URL</label>
                        <input
                            type="url"
                            id="toolImageUrl"
                            name="toolImageUrl"
                            value={toolImageUrl}
                            onChange={(e) => setToolImageUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="spaceId">Space ID</label>
                        <input
                            type="number"
                            id="spaceId"
                            name="spaceId"
                            value={spaceId ?? ""}
                            onChange={(e) => setSpaceId(e.target.value ? parseInt(e.target.value) : null)}
                        />
                    </div>
                    <button type="submit">Add Tool</button>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
};

export default ToolForm;
