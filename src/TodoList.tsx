import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (TaskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    setFilterValue: (value: FilterType, todoListId: string) => void
    changeIsDoneValue: (TaskId: string, IsDoneValue: boolean, todoListId: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    let [inputValue, setInputValue] = useState('')
    const addItem = () => {
        if(inputValue){
            props.addTask(inputValue, props.todoListId)
            setInputValue('')
        }
    }
    const onkeypressHandler =  (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            addItem()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
    return (
        <div>
            <div className="App">
                <div>
                    <h3>{props.title}</h3>
                    <div>
                        <input
                            value={inputValue}
                            onChange={onChangeHandler}
                            onKeyPress={onkeypressHandler}
                        />
                        <button onClick={addItem}>+</button>
                    </div>
                    <ul>
                        {props.tasks.map(t => {
                                const onclickHandler = () => props.removeTask(t.id, props.todoListId)
                                const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeIsDoneValue(t.id, e.currentTarget.checked, props.todoListId)
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
                            props.setFilterValue("All", props.todoListId)
                        }}>All
                        </button>
                        <button onClick={() => {
                            props.setFilterValue("Active", props.todoListId)
                        }}>Active
                        </button>
                        <button onClick={() => {
                            props.setFilterValue("Completed", props.todoListId)
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