type Props = {
    task: ITask;
};

const Task = ({ task }: Props) => {
    return <div className="border p-2 mb-2 rounded-sm">{task.content}</div>;
};

export default Task;
