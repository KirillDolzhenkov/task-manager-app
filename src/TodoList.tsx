import React, {useState} from "react";
import {FilterValueType, TasksType} from "./App";
import {Button} from "./components/Button";
import styles from "./Todolist.module.css";

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
    const [selectedButton, setSelectedButton] = useState<FilterValueType>(props.filter);

    const allButtonClassname = selectedButton === "All" ? styles.selectedButton : "";
    const activeButtonClassname = selectedButton === "Active" ? styles.selectedButton : "";
    const completedButtonClassname = selectedButton === "Completed" ? styles.selectedButton : "";

    const onChangeInput= (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    }

    const onRemoveTask = (id: string, taskId: string) => {
        props.removeTask(id, taskId);
    }

    const onAddTask = (title: string) => {
        if(!title){
            setError("The title field is required");
        } else {
            props.addTask(props.id, title.trim());
            setTitle("");
        }
    }

    const onEnterPress  = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onAddTask(title);
    }

    const onChangeFilter = (id: string, filterValue: FilterValueType) => {
        props.changFilterValue(props.id, filterValue);
        setSelectedButton(filterValue);
    }

    const onIsDoneValue = (taskId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeIsDoneValue(props.id, taskId, e.currentTarget.checked);
    }

    const onInputKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onEnterPress(event);
    }

    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeInput(event);
    }

    const onRemoveTodoHandler = (todoListId: string) => {
        props.removeTodoLIst(todoListId);
    }


    const mappedTasks = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <Button
                    name={"X"}
                    callBack={()=>onRemoveTask(props.id, t.id)}
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
            <h3>
                {props.name}
                <Button
                    name={"X"}
                    callBack={()=>onRemoveTodoHandler(props.id)}
                />
            </h3>

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
                    callBack={() => onChangeFilter(props.id, 'All')}
                />
                <Button
                    className={activeButtonClassname}
                    name={"Active"}
                    callBack={() => onChangeFilter(props.id,'Active')}
                />
                <Button
                    className={completedButtonClassname}
                    name={"Completed"}
                    callBack={() => onChangeFilter(props.id,'Completed')}
                />
            </div>
        </div>
    )
}