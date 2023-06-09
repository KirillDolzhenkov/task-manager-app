import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from './Components/AddItemForm';
import {ButtonAppBar} from "./Components/ButtonAppBar";
import {changeFilterAC, tasksReducer} from "./reducers/tasksReducer";
import {
    addTodoAC,
    changeTodoTitleAC,
    changeTodoFilterAC,
    removeTodoAC,
    todolistsReducer
} from "./reducers/todolistsReducer";


export type FilterValuesType =  "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksStateType = {
    [todoId: string]: TaskType[];
}

const App: React.FC = () => {

    const TodolistId1 = v1();
    const TodolistId2 = v1();

    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer,[
        {id: TodolistId1, title: "What to learn", filter: "all"},
        {id: TodolistId2, title: "What to read", filter: "active"},
    ]);

    const [tasksData, dispatchTasks] = useState<TasksStateType>( {
        [TodolistId1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "JS", isDone: true},
        ],
        [TodolistId2] : [
            {id: v1(), title: "Lovecraft", isDone: true},
            {id: v1(), title: "UDon'tKnowJS", isDone: false},
            {id: v1(), title: "SomethingElse", isDone: true},
        ]
    });

    //tasks fns:


    const removeTask = (todoId: string, taskId: string) => {
       /* setTasksData({...tasksData, [todoId]: tasksData[todoId].filter(el => el.id !== taskId)} );*/
    }

    const changeStatus = (todoId: string, taskId: string, value: boolean) => {
        /*setTasksData({...tasksData, [todoId]: tasksData[todoId].map(el => el.id === taskId ? {...el, isDone: value} : el) });*/
    }

    const addTask = (todoId: string, newTitle: string) => {
       /* const newTask: TaskType = {id: v1(), title: newTitle, isDone: false};
        setTasksData({...tasksData, [todoId]: [newTask, ...tasksData[todoId]]});*/
    }

    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        /*setTasksData({...tasksData, [todoId]: tasksData[todoId].map(el => el.id === taskId ? {...el, title: title} : el)});*/
    }


    //todoLists fns:
    const removeTodo = (todoId: string) => {
       /* setTodoLists(todoLists.filter(el => el.id !== todoId));
        delete tasksData[todoId];*/
        dispatchTodoLists(removeTodoAC(todoId));
    }

    const addTodo = (title: string) => {
       /* const newId = v1();
        const newTodo: TodoListType =  {id: newId, title, filter: "All"};
        setTodoLists([newTodo,...todoLists]);
        setTasksData({[newId]:[], ...tasksData});*/
        dispatchTodoLists(addTodoAC(title));
    }

    const changeTodoTitle = (todoId: string, title: string) => {
       /* setTodoLists(todoLists.map(el => el.id === todoId ? {...el, title: title} : el));*/
        dispatchTodoLists(changeTodoTitleAC(todoId, title));
    }

    const changeFilter = (todoId: string, filterValue: FilterValuesType) => {
        /*setTodoLists(todoLists.map(tl=>tl.id === todoId ? {...tl, filter: filterValue}: tl));*/
        dispatchTodoLists(changeTodoFilterAC(todoId, filterValue));
    }

    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={addTodo}/>
                </Grid>

                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        const tasksForTodo = (): Array<TaskType> => {
                            switch (tl.filter) {
                                case "active": {
                                    /*return tasksData[tl.id].filter(t => !t.isDone);*/
                                    return tasksData[tl.id];
                                }
                                case "completed": {
                                    /*return tasksData[tl.id].filter(t => t.isDone);*/
                                    return tasksData[tl.id];
                                }
                                default: {
                                    return tasksData[tl.id];
                                }
                            }
                        }

                        return (

                            <Grid item  key={tl.id}>
                                <Paper style={{padding: "10px"}} elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        todoId={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasksForTodolist={tasksForTodo()}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        changeFilter={changeFilter}
                                        removeTodo={removeTodo}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoTitle={changeTodoTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
