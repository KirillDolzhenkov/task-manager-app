import {v1} from "uuid";
import {TasksStateType, TaskType} from "../App";
import {addTodoAC, removeTodoAC} from "./todolistsReducer";

/*type InitialStateType = {
    [key: string]: TaskType[];
}*/

export type TasksActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof removeTodoAC>

export const tasksReducer = (state: TasksStateType, action: TasksActionType): TasksStateType => {
    switch (action.type) {

        case "TL/TASKS/REMOVE_TASK": {
            return {
                ...state, [action.payload.todoId]: state[action.payload.todoId]
                    .filter(el => el.id !== action.payload.taskId)
            };
        }
        case "TL/TASKS/CHANGE_STATUS": {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId]
                    .map(el => el.id === action.payload.taskId
                        ? {...el, isDone: action.payload.value}
                        : el)
            };
        }
        case "TL/TASKS/ADD_TASK": {
            const newTask: TaskType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {
                ...state,
                [action.payload.todoId]: [newTask, ...state[action.payload.todoId]]
            };
        }
        case "TL/TASKS/CHANGE_TITLE": {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId]
                    .map(el => el.id === action.payload.taskId
                        ? {...el, title: action.payload.title}
                        : el)
            };
        }
        case "TL/TODO/ADD_TODO":{
            return { [action.payload.todoId] : [], ...state };

        }
        case "TL/TODO/REMOVE_TODO": {
            delete state[action.payload.todoId];
            return {...state};
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: "TL/TASKS/REMOVE_TASK",
        payload: {
            todoId,
            taskId,
        }
    } as const
}

export const changeTaskStatusAC = (todoId: string, taskId: string, value: boolean) => {
    return {
        type: "TL/TASKS/CHANGE_STATUS",
        payload: {
            todoId,
            taskId,
            value,
        }
    } as const
}

export const addTaskAC = (todoId: string, newTitle: string) => {
    return {
        type: "TL/TASKS/ADD_TASK",
        payload: {
            todoId,
            newTitle,
        }
    } as const
}

export const changeTaskTitleAC = (todoId: string, taskId: string, title: string) => {
    return {
        type: "TL/TASKS/CHANGE_TITLE",
        payload: {
            todoId,
            taskId,
            title,
        }
    } as const
}