import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

type Props = {
    column: IColumn;
    tasks: ITask[];
};

const Column = ({ column: { title, id }, tasks }: Props) => {
    return (
        <div className="m-2 border rounded-sm">
            <h3 className="p-2 font-medium text-2xl">{title}</h3>
            <Droppable droppableId={id}>
                {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => (
                    <div className={`p-2 transition-colors duration-200 ease-in ${isDraggingOver ? "bg-blue-300" : "bg-white"}`} {...droppableProps} ref={innerRef}>
                        {tasks.map((task, i) => (
                            <Task key={task.id} task={task} index={i} />
                        ))}
                        {placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
