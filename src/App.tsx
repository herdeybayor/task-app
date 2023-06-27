import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import initialData from "./initial-data";
import Column from "./Column";

function App() {
    const [data, setData] = React.useState(initialData);

    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setData(newState);
            return;
        } else {
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds,
            };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            };

            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            };

            setData(newState);
            return;
        }
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
