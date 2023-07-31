import React from "react";
import { DragDropContext, DragUpdate, DropResult } from "react-beautiful-dnd";

import initialData from "./initial-data";
import Column from "./Column";

function App() {
    const [data, setData] = React.useState(initialData);

    const onDragStart = () => {
        document.body.style.color = "orange";
        document.body.style.transition = "background-color 0.2s ease";
    };

    const onDragUpdate = (update: DragUpdate) => {
        const { destination } = update;
        const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    };

    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        document.body.style.color = "inherit";
        document.body.style.backgroundColor = "inherit";

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
        <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
            <h1 className="col-span-3 text-4xl text-center">Sherifdeen's Board</h1>
            <div className="grid grid-cols-3 gap-4">
                {data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </div>
        </DragDropContext>
    );
}

export default App;
