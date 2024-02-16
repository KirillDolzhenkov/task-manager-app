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

type TodolistPropsType = {
    id: string
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

    let tasksForTodoList = props.tasks;
    if (props.filter) {
        tasksForTodoList = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter) {
        tasksForTodoList = props.tasks.filter(t => t.isDone);
    }
    const onRemoveTask = (id: string, taskId: string) => {
        props.removeTask(id, taskId);
    }
    const onChangeFilter = (id: string, filterValue: FilterValueType) => {
        props.changFilterValue(props.id, filterValue);
        setSelectedButton(filterValue);
    }
    const onIsDoneValue = (taskId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeIsDoneValue(props.id, taskId, e.currentTarget.checked);
    }
    const onRemoveTodoHandler = (todoListId: string) => {
        props.removeTodoLIst(todoListId);
    }
    const onAddTask = (taskId: string, title: string) => {
        props.addTask(taskId, title);
    }
    const onUpdateTask = (taskId: string, title: string) => {
        props.changeTaskTitle(props.id, taskId, title);
    }
    const onUpdateTodo = (title: string) => {
        props.changeTodoTitle(props.id, title);
    }
    const onAllHandler = () => onChangeFilter(props.id, 'all');
    const onActiveHandler = () => onChangeFilter(props.id, 'active');
    const onCompletedHandler = () => onChangeFilter(props.id, 'completed');

    const mappedTasks: JSX.Element[] = tasksForTodoList.map(t => {
        return (
            <li key={t.id} >
                <Checkbox
                    checked={t.isDone}
                    onChange={(event) => onIsDoneValue(t.id, event)}
                />

                <EditTableSpan
                    className={t.isDone ? styles.isDone : ""}
                    name={t.name}
                    callBack={(title) => onUpdateTask(t.id, title)}
                />

                <IconButton>
                    <DeleteIcon onClick={()=>onRemoveTask(props.id, t.id)}/>
                </IconButton>
            </li>
        )
    });

    return (
        <div>
            <h3>
                <EditTableSpan
                    name={props.name}
                    callBack={(title)=>onUpdateTodo(title)}
                />

                <IconButton>
                    <DeleteIcon onClick={()=>onRemoveTodoHandler(props.id)}/>
                </IconButton>
            </h3>

            <AddItemForm addItem={(title)=>onAddTask(props.id, title)}/>

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

                <Button
                    variant={completedButtonVariant}
                    onClick={onCompletedHandler}
                >Completed</Button>
            </div>
        </div>
    );
}