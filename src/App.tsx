import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import initialData from "./initial-data";
import Column from "./Column";

function App() {
    const [data] = React.useState(initialData);

    const onDragEnd = (result: DropResult) => {
        console.log(result);
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {data.columnOrder.map((columnId) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                return <Column key={column.id} column={column} tasks={tasks} />;
            })}
        </DragDropContext>
    );
}

export default App;
