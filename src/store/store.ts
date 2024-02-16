
import {TodolistReducer} from "../redusers/TodolistReducer";
import {TasksReducer} from "../redusers/TasksReducer";
import {combineReducers, legacy_createStore} from "redux";

export type RootReducerType = ReturnType<typeof RootReducer>

const RootReducer = combineReducers({
    todoLists: TodolistReducer,
    tasks: TasksReducer
});

export const store = legacy_createStore(RootReducer);





































