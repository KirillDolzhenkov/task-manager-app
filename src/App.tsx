import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";

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

    /*const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), isDone: true, name: 'HTML&CSS'},
        {id: v1(), isDone: true, name: 'JS'},
        {id: v1(), isDone: false, name: 'React'},
    ]);*/

    /*const [filterValue, setFilterValue] = useState<FilterValueType>("All");*/

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [tasks, setTasks] = useState({
        [todoListId1]:[
            {id: v1(), isDone: true, name: 'HTML&CSS'},
            {id: v1(), isDone: true, name: 'JS'},
            {id: v1(), isDone: false, name: 'React'},
        ],
        [todoListId2]:[
            {id: v1(), isDone: true, name: 'Book'},
            {id: v1(), isDone: true, name: 'Curse'},
            {id: v1(), isDone: false, name: 'Water'},
        ]
    });

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, name: 'What to learn', filterValue: "All"},
        {id: todoListId2, name: 'What to bye', filterValue: "All"},
    ]);

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)});
    }

    const addTask = (todoListId: string, title: string) => {
        const newTask: TasksType = {id: v1(), isDone: false, name: title}
        setTasks({...tasks, [todoListId] : [...tasks[todoListId], newTask]});
    }

    const changFilterValue = (id: string, filterValue: FilterValueType) => {
        setTodoLists(todoLists.map(el=> el.id === id ? {...el, filterValue} : el));
    }

    const changeIsDoneValue = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el=>el.id === taskId ? {...el, isDone} : el)});
    }

    const changeTaskTitle = (todoListId: string, taskId: string, name: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el=>el.id ===taskId ? {...el, name}: el)});
    }

    const getTasksForTodolist = (todoListId: string, filterValue: FilterValueType) => {
        let tasksForTodoList = tasks[todoListId];
        switch (filterValue) {
            case "Active": {
                return tasksForTodoList = tasks[todoListId].filter(t=> !t.isDone);
            }
            case "Completed": {
                return tasksForTodoList = tasks[todoListId].filter(t=> t.isDone);
            }
            default: {
                return tasksForTodoList;
            }
        }

    }

    const removeTodoLIst = (todoListId: string) => {
        setTodoLists([...todoLists.filter(el=>el.id !== todoListId)]);
        delete tasks[todoListId];
    }

    const AddTodoList = (title: string) => {
        const newId = v1();
        const newTodoList: TodoListsType = {id: newId, name: title, filterValue: "All"}
        setTodoLists( [newTodoList, ...todoLists]);
        setTasks({[newId]: [], ...tasks});
    }

    const changeTodoTitle = (todoListId: string, name: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, name}: el));
    }

    const mappedTodoLists = todoLists.map(tl => {
        return (
            <Todolist
                key={tl.id}
                id={tl.id}
                name={tl.name}
                filter={tl.filterValue}
                tasks={getTasksForTodolist(tl.id, tl.filterValue)}
                removeTask={removeTask}
                addTask={addTask}
                changFilterValue={changFilterValue}
                changeIsDoneValue={changeIsDoneValue}
                removeTodoLIst={removeTodoLIst}
                changeTaskTitle={changeTaskTitle}
                changeTodoTitle={changeTodoTitle}
            />
        )
    });


    return (
        <div className="App">
            <AddItemForm addItem={(title)=>AddTodoList(title)}/>
            {mappedTodoLists}
        </div>
    );
}

export default App;
