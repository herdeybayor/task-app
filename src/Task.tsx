import { Draggable } from "react-beautiful-dnd";

type Props = {
    index: number;
    task: ITask;
};

const Task = ({ task, index }: Props) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {({ dragHandleProps, draggableProps, innerRef }) => (
                <div ref={innerRef} {...draggableProps} {...dragHandleProps} className="border p-2 mb-2 rounded-sm bg-white">
                    {task.content}
                </div>
            )}
        </Draggable>
    );
};

export default Task;
