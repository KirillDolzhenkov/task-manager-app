import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from './Todolist';

export type TasksType = {
    id: string
    isDone: boolean
    name: string
}

export type TodoListsType = {
    id: string
    name: string
    filterValue: FilterValueType
}

export type FilterValueType = "All" | "Active" | "Completed"

function App() {

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), isDone: true, name: 'HTML&CSS'},
        {id: v1(), isDone: true, name: 'JS'},
        {id: v1(), isDone: false, name: 'React'},
    ]);

    const [filterValue, setFilterValue] = useState<FilterValueType>("All");

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: v1(), name: 'What to learn', filterValue: "Active"},
        {id: v1(), name: 'What to bye', filterValue: "Completed"},
    ]);

    const removeTask = (id: string) => {
       setTasks(tasks.filter(t => t.id !== id));
    }

    const addTask = (title: string) => {
        const newTask: TasksType = {id: v1(), isDone: false, name: title}
        setTasks([...tasks, newTask]);
    }


    const changFilterValue = (filterValue: FilterValueType) => {
        setFilterValue(filterValue);
    }

    const getTasksForTodolist = (filterValue: FilterValueType) => {
        let tasksForTodoList = tasks;
        switch (filterValue) {
            case "Active": {
                return tasksForTodoList = tasks.filter(t=> !t.isDone);
            }
            case "Completed": {
                return tasksForTodoList = tasks.filter(t=> t.isDone);
            }
            default: {
                return tasksForTodoList;
            }
        }

    }

    const mappedTodoLists = todoLists.map(tl => {
        return (
            <Todolist
                key={tl.id}
                id={tl.id}
                name={tl.name}
                /*tasks={getTasksForTodolist(todoLists[tl.id].filterValue)}*/
                tasks={getTasksForTodolist(filterValue)}
                removeTask={removeTask}
                addTask={addTask}
                changFilterValue={changFilterValue}
            />
        )
    });


    return (
        <div className="App">
            {mappedTodoLists}
        </div>
    );
}

export default App;
