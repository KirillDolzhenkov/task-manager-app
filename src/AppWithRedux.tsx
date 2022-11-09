import React, {useCallback} from 'react';
import {AppBar, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";

import './App.css';
import {AddItemForm} from "./AddItemForm";
import {TaskType, Todolist} from "./TodoList";
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodolistAC} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "All" | "Active" | "Completed"
export type TodolistStateType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log("App is called");
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistStateType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    //tasks callBacks:
    const deleteTask = (taskId: string, todoId: string) => {
        const action = removeTaskAC(taskId, todoId);
        dispatch(action);
    };
    const createTask = (title: string, todoId: string) => {
        const action = addTaskAC(title, todoId);
        dispatch(action);
    };
    const changeFilter = (value: FilterValuesType, todoId: string) => {
        const action = changeTodoFilterAC(todoId, value);
        dispatch(action);
    };
    const changeTaskStatus = (taskId: string, isDone: boolean, todoId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todoId);
        dispatch(action);
    };
    const changeTaskTitle = (taskId: string, newTitle: string, todoId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todoId);
        dispatch(action);
    }

    //todoLists callBacks:
    const removeTodolist = useCallback((todoId: string) => {
        const action = removeTodolistAC(todoId);
        dispatch(action);
    }, []);
    const createTodolist = useCallback((title: string) => {
        const action = addTodoAC(title);
        dispatch(action);
    }, []);
    const changeTodoListTitle = useCallback((todoId: string, newTitle: string) => {
        const action = changeTodoTitleAC(newTitle, todoId);
        dispatch(action);
    }, []);

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    {/*AddItemForm: */}
                    <AddItemForm addItemHandler={createTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {/*App: */}
                    {
                        todolists.map((tl) => {

                            //filtered tasks for todolist:

                            //#1:
                            /*let tasksForTodo = tasks[tl.id];
                            if (tl.filter === "Active") {
                                tasksForTodo = tasks[tl.id].filter(t => !t.isDone);
                            }
                            if (tl.filter === "Completed") {
                                tasksForTodo = tasks[tl.id].filter(t => t.isDone);
                            }*/

                            //#2:
                            /*let tasksForTodo = (): Array<TaskType> => {
                                switch (tl.filter) {
                                    case "Active": {
                                        return tasks[tl.id].filter(t => t.isDone);
                                    }
                                    case "Completed": {
                                        return tasks[tl.id].filter(t => !t.isDone);
                                    }
                                    default:
                                        return tasks[tl.id];
                                }
                            }*/

                            //#3(clear function):
                            let getTasksForRender = (todoList: TodolistStateType, tasks: TasksStateType): Array<TaskType> => {
                                switch (tl.filter) {
                                    case "Active": {
                                        return tasks[tl.id].filter(t => t.isDone);
                                    }
                                    case "Completed": {
                                        return tasks[tl.id].filter(t => !t.isDone);
                                    }
                                    default:
                                        return tasks[tl.id];
                                }
                            };

                            return (
                                <Todolist
                                    key={tl.id}
                                    todoId={tl.id}
                                    title={tl.title}
                                    tasks={getTasksForRender(tl, tasks)}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    createTask={createTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
