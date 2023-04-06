import React, {useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    deleteTask: (taskId: string, todoId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoId: string) => void
    todoId: string
    task: TaskType
}

const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const {
        deleteTask,
        changeTaskStatus,
        changeTaskTitle,
        todoId,
        task,
    } = props;

    const onRemoveHandler = useCallback(() => {
        deleteTask(task.id, todoId);
    }, [task.id, todoId]);
    const changeTaskStatusHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(`change status ${t.id}`);
        //currentTarget set value its want to change:
        changeTaskStatus(task.id, e.currentTarget.checked, todoId);
    }, [task.id, changeTaskStatus, todoId]);
    const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todoId)
    }, [task.id, changeTaskTitle, todoId]);
    //task:
    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        {/* <input type="checkbox"
               checked={t.isDone}
               onChange={changeTaskStatusHandler}
        />*/}
        <Checkbox
            color="secondary"
            checked={task.isDone}
            onChange={changeTaskStatusHandler}
        />
        {/*<span>{t.title}</span>*/}
        <EditableSpan title={task.title} onChangeHandler={onChangeTaskTitleHandler}/>
        {/*<button onClick={onRemoveHandler}>X</button>*/}
        <IconButton
            onClick={onRemoveHandler}
        ><Delete/></IconButton>
    </div>
});

export {
    Task
}