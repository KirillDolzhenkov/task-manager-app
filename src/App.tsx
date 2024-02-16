import React, { useState } from 'react';
import { v1 } from 'uuid';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';

import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";

export type TasksType = {
    id: string
    isDone: boolean
    name: string
}

export type TodoListsType = {
    id: string
    name: string
    filterValue: FilterValueType
}

export type FilterValueType = "all" | "active" | "completed"

function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [tasks, setTasks] = useState({
        [todoListId1]:[
            {id: v1(), isDone: true, name: 'HTML&CSS'},
            {id: v1(), isDone: true, name: 'JS'},
            {id: v1(), isDone: false, name: 'React'},
        ],
        [todoListId2]:[
            {id: v1(), isDone: true, name: 'Book'},
            {id: v1(), isDone: true, name: 'Curse'},
            {id: v1(), isDone: false, name: 'Water'},
        ]
    });

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, name: 'What to learn', filterValue: "active"},
        {id: todoListId2, name: 'What to bye', filterValue: "all"},
    ]);

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)});
    }

    const addTask = (todoListId: string, title: string) => {
        const newTask: TasksType = {id: v1(), isDone: false, name: title}
        setTasks({...tasks, [todoListId] : [...tasks[todoListId], newTask]});
    }

    const changFilterValue = (id: string, filterValue: FilterValueType) => {
        setTodoLists(todoLists.map(el=> el.id === id ? {...el, filterValue} : el));
    }

    const changeIsDoneValue = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el=>el.id === taskId ? {...el, isDone} : el)});
    }

    const changeTaskTitle = (todoListId: string, taskId: string, name: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el=>el.id ===taskId ? {...el, name}: el)});
    }

    /*const getTasksForTodolist = (todoListId: string, filterValue: FilterValueType) => {
        let tasksForTodoList = tasks[todoListId];
        switch (filterValue) {
            case "Active": {
                return tasksForTodoList = tasks[todoListId].filter(t=> !t.isDone);
            }
            case "Completed": {
                return tasksForTodoList = tasks[todoListId].filter(t=> t.isDone);
            }
            default: {
                return tasksForTodoList;
            }
        }

    }*/

    const removeTodoLIst = (todoListId: string) => {
        setTodoLists([...todoLists.filter(el=>el.id !== todoListId)]);
        delete tasks[todoListId];
    }

    const AddTodoList = (title: string) => {
        const newId = v1();
        const newTodoList: TodoListsType = {id: newId, name: title, filterValue: "all"}
        setTodoLists( [newTodoList, ...todoLists]);
        setTasks({[newId]: [], ...tasks});
    }

    const changeTodoTitle = (todoListId: string, name: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, name}: el));
    }

    const mappedTodoLists: JSX.Element[] = todoLists.map(tl => {
        return (
            <Grid item>
                <Paper elevation={5} sx={{padding: "20px"}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        name={tl.name}
                        filter={tl.filterValue}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        addTask={addTask}
                        changFilterValue={changFilterValue}
                        changeIsDoneValue={changeIsDoneValue}
                        removeTodoLIst={removeTodoLIst}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoTitle={changeTodoTitle}
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
                        <AddItemForm addItem={(title) => AddTodoList(title)}/>
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
