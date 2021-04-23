import React, {ChangeEvent, useState} from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    tasks: Array<TaskType>
    removeTask: (TaskId: number) => void
    addTask: (title: string) => void
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
                        <button>All</button>
                        <button>Active</button>
                        <button>Completed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    TodoList
}