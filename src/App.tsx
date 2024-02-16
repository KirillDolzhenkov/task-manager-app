import React, {useReducer} from 'react';
import {v1} from 'uuid';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';

import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import {
    addTodoListAC,
    changFilterValueAC,
    removeTodoListAC,
    TodolistReducer,
    updateTodoListTitleAC
} from "./redusers/TodolistReducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, TasksReducer, updateTaskTitleAC} from "./redusers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";

export type TasksType = {
    taskId: string
    isDone: boolean
    name: string
}

export type TodoListsType = {
    todoId: string
    name: string
    filterValue: FilterValueType
}

export type TasksStateType = {
    [todoId: string] : TasksType[]
}

export type FilterValueType = "all" | "active" | "completed"

function App() {

    const dispatch = useDispatch();
    const tasks = useSelector<RootReducerType, TasksStateType>((state) => state.tasks);
    const todoLists = useSelector<RootReducerType, TodoListsType[]>((state) => state.todoLists);


    const addTask = (todoId: string, title: string) => {
        dispatch(addTaskAC(todoId, title));
    }

    const removeTask = (todoId: string, taskId: string) => {
        dispatch(removeTaskAC(todoId, taskId));
    }

    const changeIsDoneValue = (todoId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoId, taskId, isDone));
    }

    const changeTaskTitle = (todoId: string, taskId: string, name: string) => {
        dispatch(updateTaskTitleAC(todoId, taskId, name));
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }

    const removeTodoLIst = (todoId: string) => {
        const action = removeTodoListAC(todoId);
        dispatch(action);
    }

    const changFilterValue = (todoId: string, filterValue: FilterValueType) => {
        dispatch(changFilterValueAC(todoId, filterValue));
    }

    const updateTodoListTitle = (todoId: string, title: string) => {
        dispatch(updateTodoListTitleAC(todoId, title));
    }

    const mappedTodoLists: JSX.Element[] = todoLists.map(tl => {
        return (
            <Grid item key={tl.todoId}>
                <Paper elevation={5} sx={{padding: "20px"}}>
                    <Todolist
                        /*key={tl.TodoId}*/
                        TodoId={tl.todoId}
                        name={tl.name}
                        filter={tl.filterValue}
                        tasks={tasks[tl.todoId]}
                        removeTask={removeTask}
                        addTask={addTask}
                        changFilterValue={changFilterValue}
                        changeIsDoneValue={changeIsDoneValue}
                        removeTodoLIst={removeTodoLIst}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoTitle={updateTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    });


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container sx={{padding: "20px"}}>
                    <Grid item>
                        <AddItemForm addItem={(title) => addTodoList(title)}/>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {mappedTodoLists}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
