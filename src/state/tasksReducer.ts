import {v1} from "uuid";

import {TasksStateType} from "../App";
import {TaskType} from "../TodoList";
import {addTodoAC, removeTodolistAC} from "./todolistsReducer";

type actionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoAC> //from todolist
    | ReturnType<typeof removeTodolistAC> //from todolist

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState , action: actionType): TasksStateType => {
    switch (action.type) {
        case "TL/TASKS/REMOVE_TASK": {
            /*const stateCopy = {...state};
            const foundTasks = state[action.todoId];
            const filteredTasks = foundTasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoId] = filteredTasks;
            return stateCopy;*/
            return {
                ...state,
                [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)
            }
        }
        case "TL/TASKS/ADD_TASK": {
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            /*const stateCopy = {...state};
            const foundTask = stateCopy[action.todoId];
            const newTaskData = [newTask, ...foundTask];
            stateCopy[action.todoId] = newTaskData;
            return stateCopy;*/
            return {
                ...state,
                [action.todoId]: [newTask, ...state[action.todoId]]
            }
        }
        case "TL/TASKS/CHANGE_TASK_STATUS": {
            /*const stateCopy = {...state};*/
           /* const foundTasks = state[action.todoId];
            const foundTask = foundTasks.find(t => t.id === action.taskId);
            if (foundTask) {
                let newTask = {...foundTask, isDone: action.isDone}// for useMemo
                //foundTask.isDone = action.isDone;
            }
            state[action.todoId] = [...foundTasks];// for useMemo
            return ({...state});*/

            const foundTasks = state[action.todoId];
            state[action.todoId] = foundTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t
                );
            return ({...state});
        }
        case "TL/TASKS/CHANGE_TASK_TITTLE": {
            /*const stateCopy = {...state};*/
            /*const foundTasks = state[action.todoId];
            const foundTask = foundTasks.find(t => t.id === action.taskId);
            if (foundTask) {
                foundTask.title = action.title;
            }
            state[action.todoId] = [...foundTasks];// for useMemo
            return ({...state});*/

            const foundTasks = state[action.todoId];
            state[action.todoId] = foundTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t
                );
            return ({...state});
        }
        case "TL/TODOLIST/ADD_TODOLIST": {
            /*const stateCopy = {...state};
            stateCopy[action.todoId] = [];
            return stateCopy;*/
            return {
                ...state,
                [action.todoId]: []

            }
        }
        case "TL/TODOLIST/REMOVE_TODOLIST":{
            const stateCopy = {...state};
            delete stateCopy[action.todoId];
            return stateCopy;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todoId: string) => {
    return {type: "TL/TASKS/REMOVE_TASK", taskId, todoId} as const
}
export const addTaskAC = (title: string, todoId: string) => {
    return {type: "TL/TASKS/ADD_TASK", title, todoId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoId: string) => {
    return {type: "TL/TASKS/CHANGE_TASK_STATUS", taskId, isDone, todoId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoId: string) => {
    return {type: "TL/TASKS/CHANGE_TASK_TITTLE", taskId, title, todoId} as const
}