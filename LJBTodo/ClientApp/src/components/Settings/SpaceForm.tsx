import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSpace } from "../../redux/spacesActions";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";


const SpaceForm = () => {

    const [spaceName, setSpaceName] = useState("");
    const [spaceDescription, setSpaceDescription] = useState("");
    const [spaceImageUrl, setSpaceImageUrl] = useState("");
    const [parentSpaceId, setParentSpaceId] = useState<number | null>(null);
    const dispatch = useDispatch();
    const { getConfig } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newSpace = {
            name: spaceName,
            description: spaceDescription,
            imageUrl: spaceImageUrl,
            parentSpaceId: parentSpaceId ?? null,
            subSpaces: []
        };

        axios.post(`${import.meta.env.VITE_API_URL}/spaces`, newSpace, getConfig()).then(response => {
            dispatch(addSpace(response.data));
            // reset form
            setSpaceName("");
            setSpaceDescription("");
            setSpaceImageUrl("");
            setParentSpaceId(null);
        });
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent" aria-description="space form">
                <Dialog.Title className="DialogTitle">Add a new space</Dialog.Title>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="spaceName">Space Name</label>
                        <input
                            type="text"
                            id="spaceName"
                            name="spaceName"
                            value={spaceName}
                            onChange={(e) => setSpaceName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="spaceDescription">Space Description</label>
                        <textarea
                            id="spaceDescription"
                            name="spaceDescription"
                            value={spaceDescription}
                            onChange={(e) => setSpaceDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="spaceImageUrl">Space Image URL</label>
                        <input
                            type="url"
                            id="spaceImageUrl"
                            name="spaceImageUrl"
                            value={spaceImageUrl}
                            onChange={(e) => setSpaceImageUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="parentSpaceId">Parent Space ID</label>
                        <input
                            type="number"
                            id="parentSpaceId"
                            name="parentSpaceId"
                            value={parentSpaceId ?? ""}
                            onChange={(e) => setParentSpaceId(e.target.value ? parseInt(e.target.value) : null)}
                        />
                    </div>
                    <button type="submit">Add Space</button>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
};

export default SpaceForm;
