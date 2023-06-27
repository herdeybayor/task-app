import Task from "./Task";

type Props = {
    column: IColumn;
    tasks: ITask[];
};

const Column = ({ column: { title }, tasks }: Props) => {
    return (
        <div className="m-2 border rounded-sm">
            <h3 className="p-2 font-medium text-2xl">{title}</h3>
            <div className="p-2">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Column;
