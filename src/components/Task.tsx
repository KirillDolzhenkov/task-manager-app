import React, {useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditTableSpan} from "./EditTableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "../Todolist.module.css";

type TaskPropsType = {
    taskId: string
    isDone: boolean
    name: string
    updateTaskTitle: (taskId: string, title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    removeTask: (taskId: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(({updateTaskTitle, changeTaskStatus, removeTask, ...props}) => {
    const onUpdateTaskTitle = useCallback((title: string) => {
        updateTaskTitle(props.taskId, title);
    }, [updateTaskTitle, props.taskId]);

    const onChangeTaskHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(props.taskId, event.currentTarget.checked);
    }, [updateTaskTitle, props.taskId]);

    const onRemoveTask = useCallback(() => {
        removeTask(props.taskId);
    }, [removeTask, props.taskId]);

    return (
        <li key={props.taskId} >
            <Checkbox
                checked={props.isDone}
                onChange={onChangeTaskHandler}
            />
            <EditTableSpan
                className={props.isDone ? styles.isDone : ""}
                name={props.name}
                callBack={onUpdateTaskTitle}
            />
            <IconButton onClick={onRemoveTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
});