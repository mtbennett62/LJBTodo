import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import { setSpaces } from "../../redux/spacesActions";
import { Text } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import SpaceForm from "./SpaceForm";
import ToolForm from "./ToolForm";

const SpaceSettings = () => {
  const { spaces, tools } = useSelector((state: RootState) => state.space);
  const { getConfig } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/spaces`, getConfig())
      .then(response => {
        console.log(response.data);
        dispatch(setSpaces(response.data));
      })
      .catch(error => console.error('There was an error!', error))
  }, []);






  return (
    <div>
      <h1>Space Settings</h1>
      <div className="lists">
        <div className="list left-list">
          {spaces.map((space) => (
            <div key={`space-${space.id}`} className="space-item">
              <h2>{space.name}</h2>
              <Text>{space.description}</Text>
            </div>
          ))}
        </div>
        <div className="list right-list">
          {tools.map((tool) => (
            <div key={`tool-${tool.id}`} className="tool-item">
              <h2>{tool.name}</h2>
              <Text>{tool.description}</Text>
            </div>
          ))}
        </div>
      </div>
      <div className="inputs">
        <div className="input add-space">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="Button violet add-space">Add a space<PlusIcon /></button>
            </Dialog.Trigger>
            <SpaceForm />
          </Dialog.Root>

        </div>
        <div className="input add-tool">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="Button violet add-tool">Add a tool<PlusIcon /></button>
            </Dialog.Trigger>
            <ToolForm />
          </Dialog.Root>
        </div>
      </div>
    </div>

  );
}

export default SpaceSettings;