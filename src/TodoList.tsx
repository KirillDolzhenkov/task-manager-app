import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    tasks: Array<TaskType>
    removeTask: (TaskId: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    setFilterValue: (value: FilterType, todoListID: string) => void
    changeIsDoneValue: (TaskId: string, IsDoneValue: boolean, todoListID: string) => void
    todoListID: string
    filter: FilterType //??
    title: string
    removeTodolist: (todoListID: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (props) => {

    const removeTodolist = ()=> props.removeTodolist(props.todoListID);


    const addTask = (tittle: string) => {
        props.addTask(tittle, props.todoListID)
    }


    return (
        <div>
            <div className="App">
                <div>
                    <h3>{props.title} <button onClick={removeTodolist}
                    >X</button> </h3>




                    <AddItemForm addTask={addTask} />



                    <ul>
                        {props.tasks.map(t => {

                                const onclickHandler = () => props.removeTask(t.id, props.todoListID)
                                const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeIsDoneValue(t.id, e.currentTarget.checked, props.todoListID)
                                }
                                return (
                                    <li><input

                                        type="checkbox"
                                        checked={t.isDone}
                                        onChange={onChangeIsDoneHandler}
                                    />
                                        <span>{t.title}</span>
                                        <button onClick={onclickHandler}>X</button>
                                    </li>
                                )
                            }
                        )
                        }


                    </ul>
                    <div>
                        <button onClick={() => {
                            props.setFilterValue("All", props.todoListID)
                        }}>All
                        </button>
                        <button onClick={() => {
                            props.setFilterValue("Active", props.todoListID)
                        }}>Active
                        </button>
                        <button onClick={() => {
                            props.setFilterValue("Completed", props.todoListID)
                        }}>Completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    TodoList
}