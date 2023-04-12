import React from 'react';
import {TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {
        title,
        tasks,
        removeTask,
    } = props;

    /*const onRemoveTask = () => {
        removeTask(t.id)
    };*/

    return (
        <div >
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t => <li key={t.id}>
                    <button onClick={() => {
                        removeTask(t.id)
                    }}>X</button>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                </li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}