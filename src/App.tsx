import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType =  "All" | "Active" | "Completed"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const App: React.FC = () => {

    const [taskData, setTaskData] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "JS", isDone: true},
    ]);

    const removeTask = (taskId: string) => {
        setTaskData(taskData.filter(t => t.id !== taskId));
    }

    const changeStatus = (taskId: string, value: boolean) => {
      setTaskData(taskData.map(el => el.id === taskId ? {...el, isDone: value} : el));
    }

    const addTask = (newTitle: string) => {
        let newTask: TaskType = {id: v1(), title: newTitle, isDone: false};
        setTaskData( [newTask, ...taskData])
    }

    return (
        <div className="App">
            <Todolist
                title={'what to learn'}
                tasks={taskData}
                removeTask={removeTask}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
