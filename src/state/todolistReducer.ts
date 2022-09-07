import {TodolistStateType} from "../App";
import {v1} from "uuid";

type actionType = ReturnType<typeof removeTodolistAC> | ReturnType<typeof testAC2>

export const todolistReducer = (state: Array<TodolistStateType>, action: actionType): Array<TodolistStateType> => {
    switch (action.type) {
        case "TL/TODOLIST/REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.todoId);
        }
        case "TL/TODOLIST/ADD_TODOLIST": {
            return [{id: v1(), title: action.tittle, filter: "All"}, ...state];
        }
        default:
            return state;
    }
}

const removeTodolistAC = (todoId: string) => {
    return {type: "TL/TODOLIST/REMOVE_TODOLIST", todoId} as const
}
const testAC2 = (tittle: string) => {
    return {type: "TL/TODOLIST/ADD_TODOLIST", tittle} as const
}