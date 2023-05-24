import React, {useState} from 'react';

import {FilterValueType, TaskType} from "./App";
import {Button} from "./Components/Button";
import styles from "./Todolist.module.css"
import {Checkbox} from "./Components/Checkbox";
import {AddItemForm} from "./Components/AddItemForm";
import {EditTableSpan} from "./Components/EdittableSpan";

type TodolistPropsType = {
    todoId: string
    title: string
    filter: FilterValueType
    tasksForTodolist: Array<TaskType>
    removeTask: (todoId: string, taskId: string) => void
    addTask: (todoId: string, newTitle: string) => void
    changeStatus: (todoId: string, taskId: string, value: boolean) => void
    changeFilter: (todoId: string, filter: FilterValueType) => void
    removeTodo: (todoId: string) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
    changeTodoTitle: (todoId: string, title: string) => void
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
        removeTodo,
        changeTaskTitle,
        changeTodoTitle,
    } = props;

    const [filterValue, setFilterValue] = useState<FilterValueType>(filter);

    const allClassName = filterValue === "All" ? styles.activeFilter: "";
    const activeClassName = filterValue === "Active" ? styles.activeFilter: "";
    const completedClassName = filterValue === "Completed" ? styles.activeFilter: "";
    const isDoneClassName = (isDone: boolean) => isDone ? styles.isDone: "";

    const addTaskCallback = (title: string) => {
        addTask(todoId, title);
    }

    const changeTaskCallback = (taskId: string, title: string) => {
        changeTaskTitle(todoId, taskId, title);
    }

    const changeTodoCallback = (title: string) => {
        changeTodoTitle(todoId, title);
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

    const onRemoveTaskHandler = (taskId: string) => removeTask(todoId, taskId);
    const onCheckboxHandler = (taskId: string, checked: boolean) => {
        changeStatus(todoId, taskId, checked);
    }

    const onRemoveTodoHandler = () =>{
        removeTodo(todoId);
    }


    return (
        <div>
            <h3 >
                <EditTableSpan title={title} callback={changeTodoCallback}/>
                <Button name={"X"} callBack={onRemoveTodoHandler}/>
            </h3>
            <AddItemForm callback={addTaskCallback}/>
            <ul className={styles.unorderedList}>
                {tasksForTodolist.map(t => {
                    return (
                        <li key={t.id} className={isDoneClassName(t.isDone)}>
                            <Button name={"X"} callBack={()=>onRemoveTaskHandler(t.id)}></Button>
                            <Checkbox
                                isDone={t.isDone}
                                callBack={(checkedValue)=>{onCheckboxHandler(t.id, checkedValue)}}
                            />
                            <EditTableSpan title={t.title} callback={(title)=>changeTaskCallback(t.id, title)}/>
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

