import React, {useState} from "react";
import {FilterValueType, TasksType} from "./App";
import {Button} from "./components/Button";
import styles from "./Todolist.module.css";

type TodolistPropsType = {
    id: string
    name: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changFilterValue: (filterValue: FilterValueType) => void
    changeIsDoneValue: (id: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    /*const {
        id,
        name,
        tasks,
        removeTask,
        addTask,
        changFilterValue,
        changeIsDoneValue
    } = props;*/

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>("");
    const [selectedButton, setSelectedButton] = useState<FilterValueType>("All");

    const allButtonClassname = selectedButton === "All" ? styles.selectedButton : "";
    const activeButtonClassname = selectedButton === "Active" ? styles.selectedButton : "";
    const completedButtonClassname = selectedButton === "Completed" ? styles.selectedButton : "";

    const onChangeInput= (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    }

    const onRemoveTask = (taskId: string) => {
        props.removeTask(taskId);
    }

    const onAddTask = (title: string) => {
        if(!title){
            setError("The title field is required");
        } else {
            props.addTask(title.trim());
            setTitle("");
        }
    }

    const onEnterPress  = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onAddTask(title);
    }

    const onChangeFilter = (filterValue: FilterValueType) => {
        props.changFilterValue(filterValue);
        setSelectedButton(filterValue);
    }

    const onIsDoneValue = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeIsDoneValue(id, e.currentTarget.checked);
    }

    const onInputKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onEnterPress(event);
    }

    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeInput(event);
    }



    const mappedTasks = props.tasks.map(t => {

        return (
            <li key={t.id}>
                <Button
                    name={"X"}
                    callBack={()=>onRemoveTask(t.id)}
                />
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={(event)=>onIsDoneValue(t.id, event)}
                />
                <span className={t.isDone ? styles.isDone : ""}>{t.name}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.name}</h3>
            <div>
                <input
                    value={title}
                    onKeyDown={onInputKeyDownHandler}
                    onChange={onInputChangeHandler}
                />
                <Button
                    name={"+"}
                    callBack={()=>onAddTask(title)}
                />
                {error && <div style={{"color": "red"}}>{error}</div> }
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <Button
                    className={allButtonClassname}
                    name={"All"}
                    callBack={() => onChangeFilter('All')}
                />
                <Button
                    className={activeButtonClassname}
                    name={"Active"}
                    callBack={() => onChangeFilter('Active')}
                />
                <Button
                    className={completedButtonClassname}
                    name={"Completed"}
                    callBack={() => onChangeFilter('Completed')}
                />
            </div>
        </div>
    )
}