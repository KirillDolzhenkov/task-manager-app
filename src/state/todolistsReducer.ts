import {v1} from "uuid";

import {FilterValuesType, TodolistStateType} from "../App";

export type TodoReducerAT = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof changeTodoTitleAC>



export const todolistsReducer = (state: Array<TodolistStateType>, action: TodoReducerAT): Array<TodolistStateType> => {
    switch (action.type) {
        case "TL/TODOLIST/REMOVE_TODOLIST": {
            let stateCopy = [...state];
            return stateCopy.filter(tl => tl.id !== action.todoId);
        }
        case "TL/TODOLIST/ADD_TODOLIST": {
            let stateCopy = [...state];
            return [{id: action.todoId, title: action.tittle, filter: "All"}, ...stateCopy];
        }
        case "TL/TODOLIST/CHANGE_TODO_FILTER": {
            return state.map(tl => tl.id !== action.todoId ? tl : {...tl, filter: action.filter});
        }
        case "TL/TODOLIST/CHANGE_TODO_TITLE":{
            return state.map(tl=> tl.id !== action.todoId ? tl : {...tl, title: action.title});
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todoId: string) => {
    return {type: "TL/TODOLIST/REMOVE_TODOLIST", todoId} as const
}
export const addTodoAC = (tittle: string) => {
    return {type: "TL/TODOLIST/ADD_TODOLIST", tittle, todoId: v1()} as const
}
export const changeTodoFilterAC = (todoId: string, filter: FilterValuesType) => {
    return {type: "TL/TODOLIST/CHANGE_TODO_FILTER", todoId, filter} as const
}
export const changeTodoTitleAC = (todoId: string, title: string) => {
    return {type: "TL/TODOLIST/CHANGE_TODO_TITLE", todoId, title} as const
}