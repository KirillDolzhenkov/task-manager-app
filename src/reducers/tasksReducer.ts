import {FilterValuesType, TaskType} from "../App";

type InitialStateType = {
    [key: string]: TaskType[];
}

export const tasksReducer = (state: InitialStateType, action: TasksActionType) => {
    switch (action.type) {
        case "TL/TASKS/CHANGE_FILTER": {
            return state
        }
        case "TL/TASKS/REMOVE_TASK":{
            return state;
        }
        case "TL/TASKS/CHANGE_STATUS": {
            return state;
        }
        case "TL/TASKS/ADD_TASK": {
            return state;
        }
        case "TL/TASKS/CHANGE_TITLE": {
            return state;
        }
        default: return state;
    }
}

export type TasksActionType = ChangeFilterACType
    | RemoveTaskACType
    | ChangeStatusACType
    | AddTaskACType
    | ChangeTaskTitleACType

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const changeFilterAC = (todoId: string, filterValue: FilterValuesType) => {
    return {
        type: "TL/TASKS/CHANGE_FILTER",
        payload: {
            todoId,
            filterValue,
        }
    } as const
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

export const changeStatusAC = (todoId: string, taskId: string, value: boolean) => {
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