import React, {useState} from 'react';
import {v1} from 'uuid';

import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from './Components/AddItemForm';

export type FilterValueType =  "All" | "Active" | "Completed"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

const App: React.FC = () => {

    const TodolistId1 = v1();
    const TodolistId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: TodolistId1, title: "What to learn", filter: "All"},
        {id: TodolistId2, title: "What to read", filter: "Active"},
    ]);

    const [tasksData, setTasksData] = useState({
        [TodolistId1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "JS", isDone: true},
        ],
        [TodolistId2] : [
            {id: v1(), title: "Lovecraft", isDone: true},
            {id: v1(), title: "UDon'tKnowJS", isDone: false},
            {id: v1(), title: "SomethingElse", isDone: true},
        ]
    });

    //tasks fns:
    const changeFilter = (todoId: string, filterValue: FilterValueType) => {
        setTodoLists(todoLists.map(tl=>tl.id === todoId ? {...tl, filter: filterValue}: tl));
    }

    const removeTask = (todoId: string, taskId: string) => {
        setTasksData({...tasksData, [todoId]: tasksData[todoId].filter(el => el.id !== taskId)} );
    }

    const changeStatus = (todoId: string, taskId: string, value: boolean) => {
        setTasksData({...tasksData, [todoId]: tasksData[todoId].map(el => el.id === taskId ? {...el, isDone: value} : el) });
    }

    const addTask = (todoId: string, newTitle: string) => {
        let newTask: TaskType = {id: v1(), title: newTitle, isDone: false};
        setTasksData({...tasksData, [todoId]: [newTask, ...tasksData[todoId]]});
    }

    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        setTasksData({...tasksData, [todoId]: tasksData[todoId].map(el => el.id === taskId ? {...el, title: title} : el)});
    }


    //todoLists fns:
    const removeTodo = (todoId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoId));
        delete tasksData[todoId];
    }

    const addTodo = (title: string) => {
        let newId = v1();
        let newTodo: TodoListType =  {id: newId, title, filter: "All"};
        setTodoLists([newTodo,...todoLists]);
        setTasksData({[newId]:[], ...tasksData});
    }

    const changeTodoTitle = (todoId: string, title: string) => {
        setTodoLists(todoLists.map(el => el.id === todoId ? {...el, title: title} : el));
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodo}/>

            {todoLists.map(tl => {

                const tasksForTodo = (): Array<TaskType> => {
                    switch (tl.filter) {
                        case "Active": {
                            return tasksData[tl.id].filter(t => !t.isDone);
                        }
                        case "Completed": {
                            return tasksData[tl.id].filter(t => t.isDone);
                        }
                        default: {
                            return tasksData[tl.id];
                        }
                    }
                }

                return (
                    <Todolist
                        key={tl.id}
                        todoId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasksForTodolist={tasksForTodo()}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        changeFilter={changeFilter}
                        removeTodo={removeTodo}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoTitle={changeTodoTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;
