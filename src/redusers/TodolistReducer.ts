import {ACTION_TYPE} from "../constants/constants";
import {v1} from "uuid";
import {FilterValueType, TodoListsType} from "../App";

import {todoListId1, todoListId2} from "./TasksReducer";

type MutualType =
    |ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changFilterValueAC>
    | ReturnType<typeof updateTodoListTitleAC>

const initialState: TodoListsType[] = [
    {todoId: todoListId1, name: 'What to learn', filterValue: "all"},
    {todoId: todoListId2, name: 'What to bye', filterValue: "all"},
];

export const TodolistReducer = (state: TodoListsType[] = initialState, action: MutualType): TodoListsType[]  => {
    switch (action.type) {
        case ACTION_TYPE.TODOLIST.ADD_TODOLIST: {
            const newTodo: TodoListsType = {
                todoId: action.payload.todoId,
                name: action.payload.title,
                filterValue: "all"
            }
            return [newTodo, ...state];
        }
        case ACTION_TYPE.TODOLIST.REMOVE_TODOLIST: {
            return state.filter(tl => tl.todoId !== action.payload.todoId);
        }
        case ACTION_TYPE.TODOLIST.CHANGE_FILTER_VALUE: {
            return state.map(tl => {
                return (
                    tl.todoId === action.payload.todoId
                        ? {...tl, filterValue: action.payload.filterValue}
                        : tl
                )
            });
        }
        case ACTION_TYPE.TODOLIST.UPDATE_TODO_TITLE: {
            return state.map(tl=> {
                return (
                    tl.todoId === action.payload.todoId
                        ? {...tl, name: action.payload.title}
                        : tl
                );
            })
        }
        default: {
            return state;
        }
    }

}

export const addTodoListAC = (title: string) => ({
    type: ACTION_TYPE.TODOLIST.ADD_TODOLIST,
    payload: {
        todoId: v1(),
        title
    }
} as const);

export const removeTodoListAC = (todoId: string) => ({
    type: ACTION_TYPE.TODOLIST.REMOVE_TODOLIST,
    payload: {
        todoId
    }
}as const);

export const changFilterValueAC = (todoId: string, filterValue: FilterValueType) => ({
    type: ACTION_TYPE.TODOLIST.CHANGE_FILTER_VALUE,
    payload: {
        todoId,
        filterValue
    }
}as const);

export const updateTodoListTitleAC = (todoId: string, title: string) => ({
    type: ACTION_TYPE.TODOLIST.UPDATE_TODO_TITLE,
    payload: {
        todoId,
        title
    }
}as const);
