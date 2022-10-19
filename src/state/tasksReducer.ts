import {TasksStateType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";
import {addTodoAC, removeTodolistAC} from "./todolistsReducer";

type actionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoAC> //from todolist
    | ReturnType<typeof removeTodolistAC> //from todolist

export const tasksReducer = (state: TasksStateType, action: actionType): TasksStateType => {
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
            const stateCopy = {...state};
            const foundTasks = stateCopy[action.todoId];
            const foundTask = foundTasks.find(t => t.id === action.taskId);
            if (foundTask) {
                foundTask.isDone = action.isDone;
            }
            return stateCopy;
        }
        case "TL/TASKS/CHANGE_TASK_TITTLE": {
            const stateCopy = {...state};
            const foundTasks = stateCopy[action.todoId];
            const foundTask = foundTasks.find(t => t.id === action.taskId);
            if (foundTask) {
                foundTask.title = action.title;
            }
            return stateCopy;
        }
        case "TL/TODOLIST/ADD_TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todoId] = []
            return stateCopy
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