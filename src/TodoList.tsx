import React from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

const Todolist: React.FC<TodolistPropsType> = (props) => {
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

    const removeTodo = () => {
        removeTodolist(todoId);
    }
    const changeTodoTitle = (newTitle: string) => {
        changeTodoListTitle(todoId, newTitle);
    }
    const onAllClickHandler = () => changeFilter("All", todoId);
    const onActiveClickHandler = () => changeFilter("Active", todoId);
    const onCompletedClickHandler = () => changeFilter("Completed", todoId);
    //fnc for adding task for todolist used todoId and addItemForm
    const addTask = (title: string) => {
        createTask(title, todoId); //todoId from props
    }

    return (
        <div>
            <h3>
                <EditableSpan onChangeHandler={changeTodoTitle} title={title}/>
                <button onClick={removeTodo}>X</button>
            </h3>
            <AddItemForm addItemHandler={addTask}/>
            <ul>
                {
                    tasks.map(t => {
                        const onRemoveHandler = () => {
                            deleteTask(t.id, todoId);
                        }
                        const changeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                            //console.log(`change status ${t.id}`);
                            //currentTarget set value its want to change:
                            changeTaskStatus(t.id, e.currentTarget.checked, todoId);
                        }
                        const onChangeTaskTitleHandler = (newTitle: string) => {
                            changeTaskTitle(t.id, newTitle, todoId)
                        }
                        //task:
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={changeTaskStatusHandler}
                            />
                            {/*<span>{t.title}</span>*/}
                            <EditableSpan title={t.title} onChangeHandler={onChangeTaskTitleHandler}/>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>

                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={filter === "All" ? "active-filter" : ""}
                >All</button>
                <button onClick={onActiveClickHandler}
                        className={filter === "Active" ? "active-filter" : ""}
                >Active</button>
                <button onClick={onCompletedClickHandler}
                        className={filter === "Completed" ? "active-filter" : ""}
                >Completed</button>
            </div>
        </div>
    );
}

export {
    Todolist
}