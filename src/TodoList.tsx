import React, {useState} from 'react';

import {FilterValueType, TaskType} from "./App";
import {Button} from "./Components/Button";
import styles from "./Todolist.module.css"
import {Checkbox} from "./Components/Checkbox";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (newTitle: string) => void
    changeStatus: (taskId: string, value: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const {
        title,
        tasks,
        removeTask,
        addTask,
        changeStatus,
    } = props;

    const [filter, setFilter] = useState<FilterValueType>("All");
    const [newTask, setNewTask] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const inputClassName = error ? styles.error : "";
    const allClassName = filter === "All" ? styles.activeFilter: "";
    const activeClassName = filter === "Active" ? styles.activeFilter: "";
    const completedClassName = filter === "Completed" ? styles.activeFilter: "";
    const isDoneClassName = (isDone: boolean) => isDone ? styles.isDone: "";

    const changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue);
    }

    const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTask(e.currentTarget.value);
    }

    const addNewTaskHandler = () => {
        if (newTask.trim() !== "") {
            addTask(newTask.trim());
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

    const onClickAllHandler = () => changeFilter("All");
    const onClickActiveHandler = () => changeFilter("Active");
    const onClickCompletedHandler = () => changeFilter("Completed");

    const onRemoveHandler = (taskId: string) => removeTask(taskId);
    const onCheckboxHandler = (taskId: string, checked: boolean) => {
        changeStatus(taskId, checked);
    }

    const tasksForTodo = (filter: FilterValueType) => {
        switch (filter) {
            case "Active": {
                return tasks.filter(t => !t.isDone);
            }
            case "Completed": {
                return tasks.filter(t => t.isDone);
            }
            default: {
                return tasks;
            }
        }
    }
    const tasksForTodolist = tasksForTodo(filter);

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
            <ul>
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

