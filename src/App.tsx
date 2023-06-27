import React from "react";

import initialData from "./initial-data";
import Column from "./Column";

function App() {
    const [data, setData] = React.useState(initialData);
    return data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
    });
}

export default App;
