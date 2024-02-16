import React, {useState} from "react";
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

import {FilterValueType, TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import styles from "./Todolist.module.css";
import {EditTableSpan} from "./components/EditTableSpan";
import {OwnButton} from "./components/ButtonComponent";

type TodolistPropsType = {
    TodoId: string
    name: string
    filter: FilterValueType
    tasks: TasksType[]
    removeTask: (todoListId: string,taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changFilterValue: (id: string, filterValue: FilterValueType) => void
    changeIsDoneValue: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTodoLIst: (todoListId: string ) => void
    changeTaskTitle: (todoListId: string, taskId: string, name: string) => void
    changeTodoTitle: (todoListId: string, name: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const [selectedButton, setSelectedButton] = useState<FilterValueType>(props.filter);
    const allButtonVariant = selectedButton === "all" ? "contained" : "outlined";
    const activeButtonVariant = selectedButton === "active" ? "contained" : "outlined";
    const completedButtonVariant = selectedButton === "completed" ? "contained" : "outlined";

    let tasksForTodoList: TasksType[] = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
    }

    const onRemoveTask = (id: string, taskId: string) => {
        props.removeTask(id, taskId);
    }
    const onChangeFilter = (id: string, filterValue: FilterValueType) => {
        props.changFilterValue(props.TodoId, filterValue);
        setSelectedButton(filterValue);
    }
    const onIsDoneValue = (taskId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeIsDoneValue(props.TodoId, taskId, e.currentTarget.checked);
    }
    const onRemoveTodoHandler = (todoListId: string) => {
        props.removeTodoLIst(todoListId);
    }
    const onAddTask = (taskId: string, title: string) => {
        props.addTask(taskId, title);
    }
    const onUpdateTask = (taskId: string, title: string) => {
        props.changeTaskTitle(props.TodoId, taskId, title);
    }
    const onUpdateTodo = (title: string) => {
        props.changeTodoTitle(props.TodoId, title);
    }
    const onAllHandler = () => onChangeFilter(props.TodoId, 'all');
    const onActiveHandler = () => onChangeFilter(props.TodoId, 'active');
    const onCompletedHandler = () => onChangeFilter(props.TodoId, 'completed');

    const mappedTasks: JSX.Element[] = tasksForTodoList.map(t => {
        return (
            <li key={t.taskId} >
                <Checkbox
                    checked={t.isDone}
                    onChange={(event) => onIsDoneValue(t.taskId, event)}
                />
                <EditTableSpan
                    className={t.isDone ? styles.isDone : ""}
                    name={t.name}
                    callBack={(title) => onUpdateTask(t.taskId, title)}
                />
                <IconButton onClick={()=>onRemoveTask(props.TodoId, t.taskId)}>
                    <DeleteIcon/>
                </IconButton>
            </li>
        )
    });

    return (
        <div>
            <h3>
                <EditTableSpan
                    name={props.name}
                    callBack={(title) => onUpdateTodo(title)}
                />
                <IconButton onClick={() => onRemoveTodoHandler(props.TodoId)}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title) => onAddTask(props.TodoId, title)}/>
            <ul className="tasks-list">
                {mappedTasks}
            </ul>
            <div className="filter-section">
                <Button
                    variant={allButtonVariant}
                    onClick={onAllHandler}
                >All</Button>
                <Button
                    variant={activeButtonVariant}
                    onClick={onActiveHandler}
                >Active</Button>
                {/*<Button
                    variant={completedButtonVariant}
                    onClick={onCompletedHandler}
                >Completed</Button>*/}
                <OwnButton
                    variant={completedButtonVariant}
                    callBack={onCompletedHandler}
                >Completed</OwnButton>
            </div>
        </div>
    );
}