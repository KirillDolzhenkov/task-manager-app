
import {v1} from "uuid";

type FilterValuesType =  "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodoListType>, action: TodoActionType): Array<TodoListType> => {
    switch (action.type) {
        case "TL/TODO/REMOVE_TODO": {
            return state.filter(el => el.id !== action.payload.todoId);
        }
        case "TL/TODO/ADD_TODO": {
            let newTodo: TodoListType =  {id: v1(), title: action.payload.title, filter: "all"};
            return [newTodo, ...state];
        }
        case "TL/TODO/CHANGE_TITLE": {
            return state.map(el=>el.id === action.payload.todoId ? {...el, title: action.payload.title} : el);
        }
        case "TL/TODO/CHANGE_FILTER": {
            return state.map(el=>el.id === action.payload.todoId ? {...el, filter: action.payload.filterValue} : el);
        }
        default: return state;
    }
};


export type TodoActionType = RemoveTodoACType
    | AddTodoACType
    | ChangeTitleACType
    | ChangeFilterACType


type RemoveTodoACType = ReturnType<typeof removeTodoAC>
export const removeTodoAC = (todoId: string) => {
    return {
        type: "TL/TODO/REMOVE_TODO",
        payload: {
            todoId,
        }
    } as const
}

type AddTodoACType = ReturnType<typeof addTodoAC>
export const addTodoAC = (title: string) => {
    return {
        type: "TL/TODO/ADD_TODO",
        payload: {
            title,
        }
    } as const
}


type ChangeTitleACType = ReturnType<typeof changeTodoTitleAC>
export const changeTodoTitleAC = (todoId: string, title: string) => {
    return {
        type: "TL/TODO/CHANGE_TITLE",
        payload: {
            todoId,
            title,
        }
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeTodoFilterAC>
export const changeTodoFilterAC = (todoId: string, filterValue: FilterValuesType) => {
    return {
        type: "TL/TODO/CHANGE_FILTER",
        payload: {
            todoId,
            filterValue,
        }
    } as const
}