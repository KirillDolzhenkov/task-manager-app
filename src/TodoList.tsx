import React, {useState} from 'react';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

import {FilterValuesType, TaskType} from "./App";
import {ButtonComponent} from "./Components/ButtonComponent";
import styles from "./Todolist.module.css"
import {CheckboxComponent} from "./Components/CheckboxComponent";
import {AddItemForm} from "./Components/AddItemForm";
import {EditTableSpan} from "./Components/EdittableSpan";


type TodolistPropsType = {
    todoId: string
    title: string
    filter: FilterValuesType
    tasksForTodolist: Array<TaskType>
    removeTask: (todoId: string, taskId: string) => void
    addTask: (todoId: string, newTitle: string) => void
    changeStatus: (todoId: string, taskId: string, value: boolean) => void
    changeFilter: (todoId: string, filter: FilterValuesType) => void
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

    const [filterValue, setFilterValue] = useState<FilterValuesType>(filter);

    /*const allClassName = filterValue === "All" ? styles.activeFilter: "";
    const activeClassName = filterValue === "Active" ? styles.activeFilter: "";
    const completedClassName = filterValue === "Completed" ? styles.activeFilter: "";*/

    const allBtnVariant = filterValue === "all" ? "contained" : "outlined";
    const activeBtnVariant = filterValue === "active" ? "contained" : "outlined";
    const completedBtnVariant = filterValue === "completed" ? "contained" : "outlined";

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
        changeFilter(todoId,"all");
        setFilterValue("all");
    };
    const onClickActiveHandler = () => {
        changeFilter(todoId,"active");
        setFilterValue("active");
    };
    const onClickCompletedHandler = () => {
        changeFilter(todoId,"completed");
        setFilterValue("completed");
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
                {/*<Button name={"X"} callBack={onRemoveTodoHandler}/>*/}
                <IconButton aria-label="delete" size="small" onClick={onRemoveTodoHandler}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>

            </h3>
            <AddItemForm callback={addTaskCallback}/>
            <ul className={styles.unorderedList}>
                {tasksForTodolist.map(t => {
                    return (
                        <li key={t.id} className={isDoneClassName(t.isDone)}>
                            <ButtonComponent name={"X"} callBack={()=>onRemoveTaskHandler(t.id)}></ButtonComponent>
                            {/*<IconButton aria-label="delete" size="small" onClick={()=>onRemoveTaskHandler(t.id)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>*/}
                            <CheckboxComponent
                                isDone={t.isDone}
                                callBack={(checkedValue)=>{onCheckboxHandler(t.id, checkedValue)}}
                            />
                            {/*<Checkbox
                                checked={t.isDone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{onCheckboxHandler(t.id, e.currentTarget.checked)}}
                            />*/}
                            <EditTableSpan title={t.title} callback={(title)=>changeTaskCallback(t.id, title)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                {/*<Button className={allClassName} name={"All"} callBack={onClickAllHandler}></Button>
                <Button className={activeClassName} name={"Active"} callBack={onClickActiveHandler}></Button>
                <Button className={completedClassName} name={"Completed"} callBack={onClickCompletedHandler}></Button>*/}
                <Button variant={allBtnVariant}  onClick={onClickAllHandler}>All</Button>
                <Button variant={activeBtnVariant}  onClick={onClickActiveHandler}>Active</Button>
                <Button variant={completedBtnVariant}  onClick={onClickCompletedHandler}>Completed</Button>
            </div>
        </div>
    )
}

