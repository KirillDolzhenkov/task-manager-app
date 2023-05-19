import React, {useState} from 'react';

import {FilterValueType, TaskType} from "./App";
import {Button} from "./Components/Button";
import styles from "./Todolist.module.css"
import {Checkbox} from "./Components/Checkbox";

type TodolistPropsType = {
    todoId: string
    title: string
    filter: FilterValueType
    tasksForTodolist: Array<TaskType>
    removeTask: (todoId: string, taskId: string) => void
    addTask: (todoId: string, newTitle: string) => void
    changeStatus: (taskId: string, value: boolean) => void
    changeFilter: (todoId: string, filter: FilterValueType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const {
        todoId,
        title,
        filter,
        tasksForTodolist,
        removeTask,
        addTask,
        changeStatus,
        changeFilter,
    } = props;

    const [filterValue, setFilterValue] = useState<FilterValueType>(filter);
    const [newTask, setNewTask] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const inputClassName = error ? styles.error : "";
    const allClassName = filterValue === "All" ? styles.activeFilter: "";
    const activeClassName = filterValue === "Active" ? styles.activeFilter: "";
    const completedClassName = filterValue === "Completed" ? styles.activeFilter: "";
    const isDoneClassName = (isDone: boolean) => isDone ? styles.isDone: "";

    const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTask(e.currentTarget.value);
    }

    const addNewTaskHandler = () => {
        if (newTask.trim() !== "") {
            addTask(todoId, newTask.trim());
            setNewTask("");
        } else {
            setError("Title is required!");
        }

    }

    const onButtonHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTaskHandler();
        }
    }

    const onClickAllHandler = () => {
        changeFilter(todoId,"All");
        setFilterValue("All");
    };
    const onClickActiveHandler = () => {
        changeFilter(todoId,"Active");
        setFilterValue("Active");
    };
    const onClickCompletedHandler = () => {
        changeFilter(todoId,"Completed");
        setFilterValue("Completed");
    };

    const onRemoveHandler = (taskId: string) => removeTask(todoId, taskId);
    const onCheckboxHandler = (taskId: string, checked: boolean) => {
        changeStatus(taskId, checked);
    }

    return (
        <div>
            <h3 >{title}</h3>
            <div>
                <input
                    className={`${inputClassName}`}
                    onChange={onChangeTask}
                    value={newTask}
                    onKeyDown={onButtonHandler}
                />
                <Button name={"+"} callBack={addNewTaskHandler}></Button>
            </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
            <ul className={styles.unorderedList}>
                {tasksForTodolist.map(t => {
                    return (
                        <li key={t.id} className={isDoneClassName(t.isDone)}>
                            <Button name={"X"} callBack={()=>onRemoveHandler(t.id)}></Button>
                            <Checkbox
                                isDone={t.isDone}
                                callBack={(checkedValue)=>{onCheckboxHandler(t.id, checkedValue)}}
                            />
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button className={allClassName} name={"All"} callBack={onClickAllHandler}></Button>
                <Button className={activeClassName} name={"Active"} callBack={onClickActiveHandler}></Button>
                <Button className={completedClassName} name={"Completed"} callBack={onClickCompletedHandler}></Button>
            </div>
        </div>
    )
}

