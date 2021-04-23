import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';

function App() {

    let [tasksData, setTasksData] = useState(
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
    return (
        <TodoList
            addTask={addTask}
            removeTask={removeTask}
            tasks={tasksData}
        />
    );
}


export default App;
