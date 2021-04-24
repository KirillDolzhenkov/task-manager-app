import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterType =  "All"|"Active"|"Completed"

function App() {
    let [filter,setFilter] = useState<FilterType>("All")
    let [tasksData, setTasksData] = useState<Array<TaskType>>(
        [
            {id: 1, title: "React", isDone: false},
            {id: 2, title: "HTML&CSS", isDone: true},
            {id: 3, title: "JS", isDone: true},
        ]
    )

    const removeTask = (TaskId: number) => {
        setTasksData(tasksData.filter(t => t.id !== TaskId))
    }
    const addTask = (title: string) => {
        let newTask = {id: 4, title, isDone: false}
        setTasksData([newTask, ...tasksData])
    }
    const setFilterValue = (value: FilterType)=> {
        setFilter(value)
    }


    /*switch (filter) {
        case "Active":{
            return tasksData.filter(t=>t.isDone)
        }
        case "Completed":{
            return tasksData.filter(t=>!t.isDone)
        }
        default:
            return tasksData
    }*/

    let tasksForTodoList = tasksData
    if (filter==="Active"){
        tasksForTodoList = tasksData.filter(t=>t.isDone)
    }
    if (filter==="Active"){
        tasksForTodoList = tasksData.filter(t=>!t.isDone)
    }

    return (
        <TodoList
            addTask={addTask}
            removeTask={removeTask}
            tasks={tasksForTodoList}
            setFilterValue={setFilterValue}
        />
    );
}


export default App;
