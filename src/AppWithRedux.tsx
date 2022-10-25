import React, {useReducer} from 'react';
import {v1} from "uuid";
import {AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";

import './App.css';
import {AddItemForm} from "./AddItemForm";
import {TaskType, Todolist} from "./TodoList";
import {Menu} from '@material-ui/icons';
import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";
import {addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasksReducer";

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
    const TodoListId_1 = v1();
    const TodoListId_2 = v1();

    const [todosData, dispatchTodo] = useReducer(todolistsReducer, [
        {id: TodoListId_1, title: "what to learn", filter: "All"},
        {id: TodoListId_2, title: "what to bye", filter: "All"},
    ]);

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [TodoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [TodoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Coffee", isDone: false},
        ],
    });

    //tasks callBacks:
    const deleteTask = (taskId: string, todoId: string) => {
        const action = removeTaskAC(taskId, todoId);
        dispatchTasks(action);
    };
    const createTask = (title: string, todoId: string) => {
        const action = addTaskAC(title, todoId);
        dispatchTasks(action);
    };
    const changeFilter = (value: FilterValuesType, todoId: string) => {
        const action = changeTodoFilterAC(todoId, value);
        dispatchTodo(action);
    };
    const changeTaskStatus = (taskId: string, isDone: boolean, todoId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todoId);
        dispatchTasks(action);
    };
    const changeTaskTitle = (taskId: string, newTitle: string, todoId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todoId);
        dispatchTasks(action);
    }


    //todoLists callBacks:
    const removeTodolist = (todoId: string) => {
        const action = removeTodolistAC(todoId);
        dispatchTasks(action);
        dispatchTodo(action);
    }
    const createTodolist = (title: string) => {
        const action = addTodoAC(title);
        dispatchTasks(action);
        dispatchTodo(action);
    }
    const changeTodoListTitle = (todoId: string, newTitle: string) => {
        const action = changeTodoTitleAC(newTitle, todoId);
        dispatchTodo(action);
    }

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
                        todosData.map((tl) => {

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
