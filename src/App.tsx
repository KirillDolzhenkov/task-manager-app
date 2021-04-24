import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterType =  "All"|"Active"|"Completed"

function App() {
    let [filter,setFilter] = useState<FilterType>("All")
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
    const setFilterValue = (value: FilterType)=> {
        setFilter(value)
    }
    const changeIsDoneValue = (TaskId: string, IsDoneValue: boolean) => {
        let changedValue = tasksData.find(t=>t.id === TaskId)
        if (changedValue){
            changedValue.isDone = IsDoneValue
            setTasksData([...tasksData])
        }
    }

    const tasksForTodoList = ():Array<TaskType> => {
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
    }

    /*let tasksForTodoList = tasksData
    if (filter==="Active"){
        tasksForTodoList = tasksData.filter(t=>t.isDone)
    }
    if (filter==="Active"){
        tasksForTodoList = tasksData.filter(t=>!t.isDone)
    }*/
    
    return (

        <TodoList
            addTask={addTask}
            removeTask={removeTask}
            tasks={tasksForTodoList()}
            setFilterValue={setFilterValue}
            changeIsDoneValue={changeIsDoneValue}
        />
    );
}


export default App;
