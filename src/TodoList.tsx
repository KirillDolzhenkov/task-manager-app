import React, {useState} from "react";
import {FilterValueType, TasksType} from "./App";
import {Button} from "./components/Button";
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

    /*const {
        id,
        name,
        tasks,
        removeTask,
        addTask,
        changFilterValue,
        changeIsDoneValue
    } = props;*/

    const [selectedButton, setSelectedButton] = useState<FilterValueType>(props.filter);

    const allButtonClassname = selectedButton === "All" ? styles.selectedButton : "";
    const activeButtonClassname = selectedButton === "Active" ? styles.selectedButton : "";
    const completedButtonClassname = selectedButton === "Completed" ? styles.selectedButton : "";

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

    const onUpdateTodo = (title: string)=> {
        props.changeTodoTitle(props.id, title);
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
                    onChange={(event) => onIsDoneValue(t.id, event)}
                />
                <EditTableSpan
                    className={t.isDone ? styles.isDone : ""}
                    name={t.name}
                    callBack={(title) => onUpdateTask(t.id, title)}
                />
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditTableSpan
                    name={props.name}
                    callBack={(title)=>onUpdateTodo(title)}
                />
                <Button
                    name={"X"}
                    callBack={()=>onRemoveTodoHandler(props.id)}
                />
            </h3>

            <AddItemForm addItem={(title)=>onAddTask(props.id, title)}/>

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