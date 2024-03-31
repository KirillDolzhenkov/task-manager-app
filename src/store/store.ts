import {TodolistReducer} from "../redusers/TodolistReducer";
import {TasksReducer} from "../redusers/TasksReducer";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {useDispatch} from "react-redux";

const RootReducer = combineReducers({
    todoLists: TodolistReducer,
    tasks: TasksReducer
});

// @ts-ignore
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk));

export type RootReducerType = ReturnType<typeof RootReducer>

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;



































