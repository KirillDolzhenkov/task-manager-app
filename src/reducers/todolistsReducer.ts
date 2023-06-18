
import {v1} from "uuid";

type FilterValuesType =  "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TodoActionType = ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>

export const todolistsReducer = (state: Array<TodoListType>, action: TodoActionType): Array<TodoListType> => {
    switch (action.type) {
        case "TL/TODO/REMOVE_TODO": {
            return state.filter(el => el.id !== action.payload.todoId);
        }
        case "TL/TODO/ADD_TODO": {
            let newTodo: TodoListType =  {id: action.payload.todoId, title: action.payload.title, filter: "all"};
            return [ newTodo,...state ];
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

export const removeTodoAC = (todoId: string) => {
    return {
        type: "TL/TODO/REMOVE_TODO",
        payload: {
            todoId,
        }
    } as const
}

export const addTodoAC = (title: string) => {
    return {
        type: "TL/TODO/ADD_TODO",
        payload: {
            todoId: v1(),
            title
        }
    } as const
}

export const changeTodoTitleAC = (todoId: string, title: string) => {
    return {
        type: "TL/TODO/CHANGE_TITLE",
        payload: {
            todoId,
            title,
        }
    } as const
}

export const changeTodoFilterAC = (todoId: string, filterValue: FilterValuesType) => {
    return {
        type: "TL/TODO/CHANGE_FILTER",
        payload: {
            todoId,
            filterValue,
        }
    } as const
}