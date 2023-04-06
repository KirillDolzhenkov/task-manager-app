import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Task} from "./Task";


export type TaskType = {
    title: string
    isDone: boolean
    id: string
}
type TodolistPropsType = {
    todoId: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskId: string, todoId: string) => void
    changeFilter: (value: FilterValuesType, todoId: string) => void
    createTask: (title: string, todoId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoId: string) => void
    changeTodoListTitle: (todoId: string, newTitle: string) => void
}

const Todolist: React.FC<TodolistPropsType> = React.memo((props) => {
    console.log("Todolist is called");
    const {
        todoId,
        title,
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        filter,
        removeTodolist,
        changeTaskTitle,
        changeTodoListTitle,
    } = props;

    const removeTodo = useCallback(() => {
        removeTodolist(todoId);
    }, []);
    const changeTodoTitle = useCallback((newTitle: string) => {
        changeTodoListTitle(todoId, newTitle);
    }, []);
    //fnc for adding task for todolist used todoId and addItemForm
    const addTask = useCallback((title: string) => {
        createTask(title, todoId); //todoId from props
    }, []);

    const onAllClickHandler = useCallback(() => changeFilter("All", todoId),[changeFilter, todoId]);
    const onActiveClickHandler = useCallback(() => changeFilter("Active", todoId),[changeFilter, todoId]);
    const onCompletedClickHandler = useCallback(() => changeFilter("Completed", todoId),[changeFilter, todoId]);

    let tasksForRender = tasks;
    if (filter === "Active") {
        tasksForRender = tasks.filter(t => !t.isDone);
    }
    if (filter === "Completed") {
        tasksForRender = tasks.filter(t => t.isDone);
    }

    return (
        <div>
            <h3>
                <EditableSpan onChangeHandler={changeTodoTitle} title={title}/>
                {/*<button onClick={removeTodo}>X</button>*/}
                <IconButton
                    onClick={removeTodo}
                ><Delete/></IconButton>
            </h3>
            <AddItemForm addItemHandler={addTask}/>
            <ul>
                {//Task:
                    tasksForRender.map(t => <Task
                        deleteTask={deleteTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        todoId={todoId}
                        task={t}
                        key={t.id}
                    />)
                }
            </ul>
            <div>
                {/*<button onClick={onAllClickHandler}
                        className={filter === "All" ? "active-filter" : ""}
                >All</button>
                <button onClick={onActiveClickHandler}
                        className={filter === "Active" ? "active-filter" : ""}
                >Active</button>
                <button onClick={onCompletedClickHandler}
                        className={filter === "Completed" ? "active-filter" : ""}
                >Completed</button>*/}

                <Button
                    color="inherit"
                    onClick={onAllClickHandler}
                    variant={filter === "All" ? "contained" : "text"}
                >All</Button>
                <Button
                    color="primary"
                    onClick={onActiveClickHandler}
                    variant={filter === "Active" ? "contained" : "text"}
                >Active</Button>
                <Button
                    color="secondary"
                    onClick={onCompletedClickHandler}
                    variant={filter === "Completed" ? "contained" : "text"}
                >Completed</Button>
            </div>
        </div>
    );
});

export {
    Todolist
}