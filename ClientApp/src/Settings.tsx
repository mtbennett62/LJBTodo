import axios from "axios";
import { useEffect, useState } from "react";

function Settings() {
  return (
    <div>
      <h1>Settings</h1>

      <PrioritySettings />
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