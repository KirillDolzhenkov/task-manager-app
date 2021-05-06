import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterType = "All" | "Active" | "Completed"

type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}

function App() {
    /*let [filter,setFilter] = useState<FilterType>("All")*/


    const removeTask = (TaskId: string, todoListId: string) => {
        let tasks = tasksData[todoListId]
        tasksData[todoListId] = tasks.filter(t => t.id !== TaskId)
        setTasksData({...tasksData})

        /*setTasksData(tasksData.filter(t => t.id !== TaskId))*/
    }
    const addTask = (title: string,todoListId: string) => {
        let newTask = {id: v1(), title, isDone: false}
        let tasks = tasksData[todoListId]
        tasksData[todoListId]= [newTask, ...tasks]
        setTasksData({...tasksData})

        /*let newTask = {id: v1(), title, isDone: false}
        setTasksData([newTask, ...tasksData])*/
    }
    const setFilterValue = (value: FilterType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }

        /*setFilter(value)*/
    }
    const changeIsDoneValue = (TaskId: string, IsDoneValue: boolean, todoListId: string) => {
        let tasks = tasksData[todoListId]
        let changedValue = tasks.find(t => t.id === TaskId)
        if (changedValue) {
            changedValue.isDone = IsDoneValue
            setTasksData({...tasksData})
        /*let changedValue = tasksData.find(t => t.id === TaskId)
        if (changedValue) {
            changedValue.isDone = IsDoneValue
            setTasksData([...tasksData])*/
        }
    }

    /*const tasksForTodoList = ():Array<TaskType> => {
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
    }*/

    /*let tasksForTodoList = tasksData
    if (filter==="Active"){
        tasksForTodoList = tasksData.filter(t=>t.isDone)
    }
    if (filter==="Active"){
        tasksForTodoList = tasksData.filter(t=>!t.isDone)
    }*/
    const removeTodolist = (todoListId: string) => {
        let removedTodolist = todoLists.filter(tl=>tl.id !== todoListId)
        setTodoLists(removedTodolist)
        delete tasksData[todoListId]
        setTasksData({...tasksData})
    }
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId_1, title: "What to learn", filter: "All"},
        {id: todoListId_2, title: "What to buy", filter: "Active"},
    ])

    let [tasksData, setTasksData] = useState<TasksStateType>({
            [todoListId_1]: [
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
            ],
            [todoListId_2]: [
                {id: v1(), title: "Milk", isDone: false},
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Bread", isDone: true},
            ]
        }
    )
    return (

        <div className="App">
            {
                todoLists.map((tl) => {
                    const tasksForTodoList = () => {
                        switch (tl.filter) {
                            case "Active": {
                                return tasksData[tl.id].filter(t => t.isDone)
                            }
                            case "Completed": {
                                return tasksData[tl.id].filter(t => !t.isDone)
                            }
                            default:
                                return tasksData[tl.id]
                        }
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            todoListId={tl.id}
                            title={tl.title}
                            addTask={addTask}
                            removeTask={removeTask}
                            tasks={tasksForTodoList()}
                            setFilterValue={setFilterValue}
                            changeIsDoneValue={changeIsDoneValue}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}


export default App;
