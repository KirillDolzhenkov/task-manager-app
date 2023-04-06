import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const TaskData: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "React", isDone: false},
        {id: 3, title: "JS", isDone: true},
    ]

    return (
        <div className="App">
            <Todolist title={'what to learn'} tasks={TaskData}/>
            <Todolist title={'what to bye'} tasks={TaskData}/>
        </div>
    );
}

export default App;
