import React, {useState} from 'react';

import './App.css';
import {Todolist, TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "All" | "Active" | "Completed"
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const TodoListId_1 = v1();
    const TodoListId_2 = v1();

    const [todosData, setTodosData] = useState<Array<TodolistType>>([
        {id: TodoListId_1, title: "what to learn", filter: "All" },
        {id: TodoListId_2, title: "what to bye", filter: "All" },
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [TodoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [TodoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Coffee", isDone: false},
        ],
    });

    //tasks callBacks:
    const deleteTask = (taskId: string, todoId: string) => {
        //find tasks used TodoId from onClickHandler:
        let foundTasks = tasks[todoId];
        //remove task from all tasks:
        let filteredTasks = foundTasks.filter(t => t.id !== taskId);
        //rewrite new tasksData for todolist:
        tasks[todoId] = filteredTasks;
        //rerender all TasksData:
        setTasks({...tasks});
    };
    const createTask = (title: string, todoId: string) => {
        //create new task:
        let newTask = {id: v1(), title, isDone: false};
        //find tasks used TodoId from onClickHandler:
        let foundTasks = tasks[todoId];
        //rewrite new tasksData for todolist:
        let newTasksData = ([newTask, ...foundTasks]);
        tasks[todoId] = newTasksData;
        //rerender all TasksData:
        setTasks( {newTasksData, ...tasks});
    };
    const changeFilter = (value: FilterValuesType, todoId: string) => {
        //find todolist used todoId from onClickHandler:
        let todo = todosData.find(tl=> tl.id === todoId);
        //if todolist exists rewrite filter value and rerender all TodosData:
        if(todo){
            todo.filter = value;
            setTodosData([...todosData]);
        }
    };
    const changeTaskStatus = (taskId: string, isDone: boolean, todoId: string) => {
        //find taskS used TodoId from onClickHandler:
        let foundTasks = tasks[todoId]
        //find TASK from foundTasks used taskId from onClickHandler:
        let foundTask = foundTasks.find(t => t.id === taskId);
        //if task exists rewrite isDone value and rerender all TasksData:
        if (foundTask) {
            foundTask.isDone = isDone;
            setTasks({...tasks})
        }
    };
    const changeTaskTitle = (taskId: string, newTitle: string, todoId: string) => {
        //find taskS used TodoId from onClickHandler:
        let foundTasks = tasks[todoId];
        //find TASK from foundTasks used taskId from onClickHandler:
        let foundTask = foundTasks.find(t=> t.id === taskId);
        //if task exists rewrite title value and rerender all TasksData:
        if(foundTask){
            foundTask.title = newTitle;
            setTasks({...tasks})
        }
    }


    //todoLists callBacks:
    const removeTodolist = (todoId: string) => {
        //remove todolist used todoId:
        let filteredTodo = todosData.filter(tl => tl.id !== todoId);
        //rewrite all todoData and delete taskData of this todolist:
        setTodosData(filteredTodo);
        delete tasks[todoId];
        //rerender all tasksData:
        setTasks({...tasks});
    }
    const createTodolist = (title: string) => {
        //create new todolist:
        let newTodo: TodolistType = {id: v1(), title, filter: "All"};
        //rerender all todoData with new todolist:
        setTodosData([newTodo,...todosData]);
        //rerender all todoData with new tasks of this todolist:
        setTasks({
            ...tasks,
            [newTodo.id]: []
        });
    }
    const changeTodoListTitle = (todoId: string, newTitle: string) => {
        //found todolist used todoId:
        let filteredTodo = todosData.find(t=> t.id === todoId);
        //filteredTodo = isUndefined, if todolist exist rewrite title and rerender all todosData:
        if (filteredTodo) {
            filteredTodo.title = newTitle;
            setTodosData([...todosData]);
        }
    }

    return (
        <div className="App">
            <AddItemForm addItemHandler={createTodolist}/>
            {
                todosData.map((tl) => {

                    //filtered tasks for todolist:

                    /*let tasksForTodo = tasks[tl.id];
                    if (tl.filter === "Active") {
                        tasksForTodo = tasks[tl.id].filter(t => !t.isDone);
                    }
                    if (tl.filter === "Completed") {
                        tasksForTodo = tasks[tl.id].filter(t => t.isDone);
                    }*/


                    let tasksForTodo = (): Array<TaskType> => {
                        switch (tl.filter) {
                            case "Active": {
                                return tasks[tl.id].filter(t => t.isDone);
                            }
                            case "Completed": {
                                return tasks[tl.id].filter(t => !t.isDone);
                            }
                            default:
                                return tasks[tl.id];
                        }
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            todoId={tl.id}
                            title={tl.title}
                            tasks={tasksForTodo()}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            createTask={createTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
