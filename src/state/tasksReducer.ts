import {TasksStateType} from "../App";
import {TaskType} from "../TodoList";
import { v1 } from "uuid";

type actionType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>

export const tasksReducer = (state: TasksStateType, action: actionType): TasksStateType => {
    switch (action.type) {
        case "TL/TASKS/REMOVE_TASK": {
            const stateCopy = {...state};
            const foundTasks = state[action.todoId];
            const filteredTasks = foundTasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoId] = filteredTasks;
            return stateCopy;
            /*return {
                ...state,
                [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)
            }*/
        }
        case "TL/TASKS/ADD_TASK": {
            const stateCopy = {...state};
            const foundTask = stateCopy[action.todoId];
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            const newTaskData = [newTask, ...foundTask];
            stateCopy[action.todoId] = newTaskData;
            return stateCopy;
            /*return {
                ...state,
                [action.todoId]: [newTask, ...state[action.todoId]]
            }*/
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