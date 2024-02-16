import React, {useCallback, useState} from "react";
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {jsx} from "@emotion/react";

import {FilterValueType, TasksStateType, TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";

import {EditTableSpan} from "./components/EditTableSpan";
import {OwnButton} from "./components/ButtonComponent";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./redusers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import JSX = jsx.JSX;
import {Task} from "./components/Task";

type TodolistPropsType = {
    TodoId: string
    tasks: TasksType[]
    name: string
    filter: FilterValueType
    changFilterValue: (TodoId: string, filterValue: FilterValueType) => void
    removeTodoLIst: (todoListId: string ) => void
    changeTodoTitle: (todoListId: string, name: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({removeTodoLIst, changeTodoTitle, changFilterValue, ...props}) => {

    console.log("Todolist")
    
    const dispatch = useDispatch();
    const [selectedButton, setSelectedButton] = useState<FilterValueType>(props.filter);

    const allButtonVariant = selectedButton === "all" ? "contained" : "outlined";
    const activeButtonVariant = selectedButton === "active" ? "contained" : "outlined";
    const completedButtonVariant = selectedButton === "completed" ? "contained" : "outlined";

    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone);
    }




    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.TodoId, title));
    }, [dispatch, props.TodoId]);

    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(props.TodoId, taskId));
    }, [dispatch, props.TodoId]);

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(props.TodoId, taskId, isDone));
    }, [dispatch, props.TodoId]);

    const updateTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(updateTaskTitleAC(props.TodoId, taskId, title));
    }, [dispatch, props.TodoId]);

    const onChangeFilter = useCallback((filterValue: FilterValueType) => {
        changFilterValue(props.TodoId, filterValue);
        setSelectedButton(filterValue);
    }, [changFilterValue, props.TodoId]);

    const onRemoveTodoHandler = useCallback(() => {
        removeTodoLIst(props.TodoId);
    }, [removeTodoLIst, props.TodoId]);

    const onUpdateTodo = useCallback((title: string) => {
        changeTodoTitle(props.TodoId, title);
    }, [changeTodoTitle, props.TodoId]);

    const onAllHandler = () => onChangeFilter( 'all');
    const onActiveHandler = () => onChangeFilter('active');
    const onCompletedHandler = () => onChangeFilter('completed');

    const mappedTasks: JSX.Element[] = tasksForTodoList.map(t => {

        return (
            <Task
                key={t.taskId}
                taskId={t.taskId}
                isDone={t.isDone}
                name={t.name}

                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                updateTaskTitle={updateTaskTitle}
            />
        )

    });

    return (
        <div>
            <h3>
                <EditTableSpan
                    name={props.name}
                    callBack={onUpdateTodo}
                />
                <IconButton onClick={onRemoveTodoHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
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
                {/*<OwnButton
                    variant={completedButtonVariant}
                    callBack={onCompletedHandler}
                >Completed</OwnButton>*/}
            </div>
        </div>
    );
})