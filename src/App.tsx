import React, {useCallback} from 'react';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";

import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import {
    addTodoListAC,
    changFilterValueAC,
    removeTodoListAC,
    updateTodoListTitleAC
} from "./redusers/TodolistReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    updateTaskTitleAC
} from "./redusers/TasksReducer";
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

    console.log("App")

    const dispatch = useDispatch();
    const todoLists = useSelector<RootReducerType, TodoListsType[]>((state) => state.todoLists);
    const tasks = useSelector<RootReducerType, TasksStateType>((state) => state.tasks);

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    },[dispatch]);

    const removeTodoLIst = useCallback((todoId: string) => {
        const action = removeTodoListAC(todoId);
        dispatch(action);
    },[dispatch]);

    const changFilterValue = useCallback((todoId: string, filterValue: FilterValueType) => {
        dispatch(changFilterValueAC(todoId, filterValue));
    },[dispatch]);

    const updateTodoListTitle = useCallback((todoId: string, title: string) => {
        dispatch(updateTodoListTitleAC(todoId, title))
    },[dispatch]);






    const mappedTodoLists: JSX.Element[] = todoLists.map(tl => {
        let tasksForTodoList: TasksType[] = tasks[tl.todoId];
        return (
            <Grid item key={tl.todoId}>
                <Paper elevation={5} sx={{padding: "20px"}}>
                    <Todolist
                        /*key={tl.TodoId}*/
                        TodoId={tl.todoId}
                        tasks={tasksForTodoList}
                        name={tl.name}
                        filter={tl.filterValue}
                        changFilterValue={changFilterValue}
                        removeTodoLIst={removeTodoLIst}
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
                        <AddItemForm addItem={addTodoList}/>
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
