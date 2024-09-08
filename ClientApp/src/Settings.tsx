import { Tabs } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

function Settings() {
  return (
    <div>
      <h1>Settings</h1>

      <Tabs.Root defaultValue="categories">
        <Tabs.List>
          <Tabs.Trigger value="categories">Categories</Tabs.Trigger>
          <Tabs.Trigger value="priorities">Priorities</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="categories">
          {/* <CategorySettings /> */}
          <p>Categories</p>
        </Tabs.Content>
        <Tabs.Content value="priorities">
          {/* <PrioritySettings /> */}
          <p>Priorities</p>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function PrioritySettings() {
    const [priorities, setPriorities] = useState<Array<string>>([]);

    useEffect(() => {
        axios.get('https://localhost:7174/api/todo/priorities')
            .then(response => setPriorities(response.data))
            .catch(error => console.error('There was an error!', error));
    }, []);

  return (
    <div>
      <h1>Priority Settings</h1>


      {priorities.map((priority, index) => (
        <div key={index}>{priority}</div>
      ))}
    </div>
  );
}


export default Settings;