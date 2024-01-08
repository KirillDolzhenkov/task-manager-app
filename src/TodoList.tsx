import React, {useState} from "react";
import {FilterValueType, TasksType} from "./App";

type TodolistPropsType = {
    id: string
    name: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changFilterValue: (filterValue: FilterValueType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const {
        id,
        name,
        tasks,
        removeTask,
        addTask,
        changFilterValue
    } = props;

    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    }

    const onRemoveTask = (taskId: string) => {
        removeTask(taskId);
    }

    const onAddTask = (title: string) => {
        if(!title){
            setError("The title field is required");
        }
        addTask(title);
        setTitle("");
    }

    const onChangeFilter = (filterValue: FilterValueType) => {
        changFilterValue(filterValue);
    }

    const mappedTasks = tasks.map(t => {
        return (
            <>
                <li key={t.id}>
                    <button
                        onClick={()=>onRemoveTask(t.id)}
                    >X</button>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={()=>{}}
                    />
                    <span>{t.name}</span>
                </li>

            </>
        )
    })

    return (
        <div>
            <h3>{name}</h3>
            <div>
                <input
                    value={title}
                    onChange={(event) => onInputHandler(event)}
                />
                <button
                    onClick={()=>onAddTask(title)}
                >+</button>
                {error ? <div style={{"color": "red"}}>{error}</div> :  ""}
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button onClick={()=>onChangeFilter('All')}>All</button>
                <button onClick={()=>onChangeFilter('Active')}>Active</button>
                <button onClick={()=>onChangeFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}