import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterType = "All" | "Active" | "Completed"

function App() {
    /*let [filter,setFilter] = useState<FilterType>("All")*/
    let [tasksData, setTasksData] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ]
    )

    const removeTask = (TaskId: string) => {
        setTasksData(tasksData.filter(t => t.id !== TaskId))
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasksData([newTask, ...tasksData])
    }
    const setFilterValue = (value: FilterType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }

        /*setFilter(value)*/
    }
    const changeIsDoneValue = (TaskId: string, IsDoneValue: boolean) => {
        let changedValue = tasksData.find(t => t.id === TaskId)
        if (changedValue) {
            changedValue.isDone = IsDoneValue
            setTasksData([...tasksData])
        }
    }

    /*const tasksForTodoList = ():Array<TaskType> => {
        switch (filter) {
            case "Active": {
                return tasksData.filter(t => t.isDone)
            }
            case "Completed": {
                return tasksData.filter(t => !t.isDone)
            }
            default:
                return tasksData
        }
    }*/

    /*let tasksForTodoList = tasksData
    if (filter==="Active"){
        tasksForTodoList = tasksData.filter(t=>t.isDone)
    }
    if (filter==="Active"){
        tasksForTodoList = tasksData.filter(t=>!t.isDone)
    }*/

    let [todoLists, setTodoLists] = useState([
        {id: v1(), title: "What to learn", filter: "All"},
        {id: v1(), title: "What to buy", filter: "Active"},
    ])
    return (

        <div className="App">
            {
                todoLists.map((tl) => {
                    const tasksForTodoList = () => {
                        switch (tl.filter) {
                            case "Active": {
                                return tasksData.filter(t => t.isDone)
                            }
                            case "Completed": {
                                return tasksData.filter(t => !t.isDone)
                            }
                            default:
                                return tasksData
                        }
                    }
                    return (
                        <TodoList
                            todoListId={tl.id}
                            title={tl.title}
                            addTask={addTask}
                            removeTask={removeTask}
                            tasks={tasksForTodoList()}
                            setFilterValue={setFilterValue}
                            changeIsDoneValue={changeIsDoneValue}
                        />
                    )
                })
            }
        </div>
    );
}


export default App;
