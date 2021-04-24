import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    tasks: Array<TaskType>
    removeTask: (TaskId: number) => void
    addTask: (title: string) => void
    setFilterValue: (value: FilterType)=> void
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    let [inputValue, setInputValue] = useState('')
    const onclickHandler = () => {
        props.addTask(inputValue)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=> setInputValue(e.currentTarget.value)
    return (
        <div>
            <div className="App">
                <div>
                    <h3>What to learn</h3>
                    <div>
                        <input
                        value={inputValue}
                        onChange={onChangeHandler}
                        />
                        <button onClick={onclickHandler}>+</button>
                    </div>
                    <ul>
                        {props.tasks.map(t => {
                                const onclickHandler = () => props.removeTask(t.id)
                                return (
                                    <li><input
                                        type="checkbox"
                                        checked={t.isDone}
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
                        <button onClick={()=>{props.setFilterValue("All")}}>All</button>
                        <button onClick={()=>{props.setFilterValue("Active")}}>Active</button>
                        <button onClick={()=>{props.setFilterValue("Completed")}}>Completed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    TodoList
}