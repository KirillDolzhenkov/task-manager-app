import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {Button} from "./Components/Button";

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

    const changeFilter = (todoId: string, filterValue: FilterValueType) => {
        setTodoLists(todoLists.map(tl=>tl.id === todoId ? {...tl, filter: filterValue}: tl));
    }

    const removeTask = (todoId: string, taskId: string) => {
        /*setTasksData(tasksData.filter(t => t.id !== taskId));*/
       /* setTasksData({...tasksData, [todoId]: tasksData[todoId].filter(el => el.id !== taskId)});*/
        setTasksData({...tasksData, [todoId]: tasksData[todoId].filter(el => el.id !== taskId)} );
    }

    const changeStatus = (todoId: string, taskId: string, value: boolean) => {
      /*setTasksData(tasksData.map(el => el.id === taskId ? {...el, isDone: value} : el));*/
        setTasksData({...tasksData, [todoId]: tasksData[todoId].map(el => el.id === taskId ? {...el, isDone: value} : el) });
    }

    const addTask = (todoId: string, newTitle: string) => {
       /* let newTask: TaskType = {id: v1(), title: newTitle, isDone: false};
        setTasksData( [newTask, ...tasksData])*/
        let newTask: TaskType = {id: v1(), title: newTitle, isDone: false};
        setTasksData({...tasksData, [todoId]: [newTask, ...tasksData[todoId]]});
    }

    const removeTodo = (todoId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoId));
        delete tasksData[todoId];
    }

    return (
        <div className="App">
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
                    />
                )
            })}


        </div>
    );
}

export default App;
