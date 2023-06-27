interface IColumn {
    id: string;
    title: string;
    taskIds: string[];
}

interface ITask {
    id: string;
    content: string;
}

interface IData {
    tasks: {
        [key: string]: ITask;
    };
    columns: {
        [key: string]: IColumn;
    };
    columnOrder: string[];
}
