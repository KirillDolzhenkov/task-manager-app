import {v1} from "uuid";

import {FilterValuesType, TodolistStateType} from "../App";

type actionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoFilterAC>

export const todolistReducer = (state: Array<TodolistStateType>, action: actionType): Array<TodolistStateType> => {
    switch (action.type) {
        case "TL/TODOLIST/REMOVE_TODOLIST": {
            let stateCopy = [...state];
            return stateCopy.filter(tl => tl.id !== action.todoId);
        }
        case "TL/TODOLIST/ADD_TODOLIST": {
            return [{id: v1(), title: action.tittle, filter: "All"}, ...state];
        }
        case "TL/TODOLIST/CHANGE_TODO_FILTER": {
            let todo = state.find(tl => tl.id === action.todoId)
            if(todo){
                todo.filter = action.filter;
            }
            return [...state];
        }
        default:
            return state;
    }
}

const removeTodolistAC = (todoId: string) => {
    return {type: "TL/TODOLIST/REMOVE_TODOLIST", todoId} as const
}
const addTodoAC = (tittle: string) => {
    return {type: "TL/TODOLIST/ADD_TODOLIST", tittle} as const
}
const changeTodoFilterAC = (todoId: string, filter: FilterValuesType) => {
    return {type: "TL/TODOLIST/CHANGE_TODO_FILTER", todoId, filter} as const
}