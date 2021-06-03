import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {AddItemForm} from "./AddItemForm";

export type FilterType = "All" | "Active" | "Completed";

type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    /*let [filter,setFilter] = useState<FilterType>("All")*/


    const removeTask = (TaskId: string, todoListID: string) => {
        let task = tasksDataObj[todoListID]
        let deletedTask = task.filter(t => t.id !== TaskId)
        tasksDataObj[todoListID] = deletedTask
        setTasksData({...tasksDataObj})
    }
    const addTask = (title: string, todoListID: string) => {
        let task = tasksDataObj[todoListID]
        let newTask = {id: v1(), title, isDone: false}
        tasksDataObj[todoListID] = [newTask, ...task]
        setTasksData({...tasksDataObj})

    }
    const setFilterValue = (value: FilterType, todoListID: string) => {
        let newTodolistValue = todoLists.find(tl => tl.id === todoListID)
        if (newTodolistValue) {
            newTodolistValue.filter = value
            setTodoList([...todoLists])
        }
    }
    const changeIsDoneValue = (TaskId: string, IsDoneValue: boolean, todoListID: string) => {
        let task = tasksDataObj[todoListID]
        let changedValue = task.find(t => t.id === TaskId)
        if (changedValue) {
            changedValue.isDone = IsDoneValue
            setTasksData({...tasksDataObj})
        }
    }

    const removeTodolist = (todoListID: string) => {
        let deletedTodolist = todoLists.filter(t => t.id !== todoListID)
        setTodoList(deletedTodolist)
        delete tasksDataObj[todoListID]
        setTasksData({...tasksDataObj})
    }

    const addTodolist = (title: string) => {
        let newTodolist: TodoListsType = {id: v1(), title, filter: "All"}
        setTodoList([newTodolist, ...todoLists])
        setTasksData({
            ...tasksDataObj,
            [newTodolist.id]: []
        })
    }

    let TodoListId_1 = v1();
    let TodoListId_2 = v1();

    let [todoLists, setTodoList] = useState<Array<TodoListsType>>([
        {id: TodoListId_1, title: "bla", filter: "All"},
        {id: TodoListId_2, title: "bla2", filter: "Completed"},
    ]);


    let [tasksDataObj, setTasksData] = useState<TasksStateType>({
            [TodoListId_1]: [
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
            ],
            [TodoListId_2]: [
                {id: v1(), title: "bla", isDone: false},
                {id: v1(), title: "123", isDone: true},
                {id: v1(), title: "hello", isDone: true},
            ],
        }
    )

    return (

        <div className={"App"}>
            <AddItemForm addTask={addTodolist}/>
            {
                todoLists.map((tl) => {
                    let tasksForTodoList = (): Array<TaskType> => {
                        switch (tl.filter) {
                            case "Active": {
                                return tasksDataObj[tl.id].filter(t => t.isDone)
                            }
                            case "Completed": {
                                return tasksDataObj[tl.id].filter(t => !t.isDone)
                            }
                            default:
                                return tasksDataObj[tl.id]
                        }
                    }

                    /*let tasksForTodoList = tasksDataObj[tl.id];
                    if (tl.filter === "Active"){
                        tasksForTodoList = tasksDataObj[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === "Completed"){
                        tasksForTodoList = tasksDataObj[tl.id].filter(t => !t.isDone)
                    }*/
                    return (
                        <TodoList
                            key={tl.id}
                            title={tl.title}
                            filter={tl.filter} //??
                            todoListID={tl.id}
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
