import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const [taskData, setTaskData] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "React", isDone: false},
        {id: 3, title: "JS", isDone: true},
    ]);

    const removeTask = (taskId: number) => {
        let filteredTasks = taskData.filter(t => t.id !== taskId)
        setTaskData(filteredTasks);
    }

    const tasksForTodo: Array<TaskType> =  taskData;
    return (
        <div className="App">
            <Todolist
                title={'what to learn'}
                tasks={tasksForTodo}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
