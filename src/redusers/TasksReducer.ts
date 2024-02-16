import {TasksStateType, TodoListsType} from "../App";
import {v1} from "uuid";
import {ACTION_TYPE} from "../constants/constants";
import {addTodoListAC, removeTodoListAC} from "./TodolistReducer";

type MutualType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: TasksStateType = {
    [todoListId1] : [
        {taskId: v1(), isDone: true, name: 'HTML&CSS'},
        {taskId: v1(), isDone: true, name: 'JS'},
        {taskId: v1(), isDone: false, name: 'React'},
    ],
    [todoListId2] : [
        {taskId: v1(), isDone: true, name: 'Book'},
        {taskId: v1(), isDone: true, name: 'Curse'},
        {taskId: v1(), isDone: false, name: 'Water'},
    ]
};

export const TasksReducer = (state: TasksStateType = initialState, action: MutualType): TasksStateType  => {
    switch (action.type) {
        case ACTION_TYPE.TASK.ADD_TASK:{
            const newTask = {taskId: action.payload.taskId, isDone: false, name: action.payload.title}
            return {
                ...state,
                [action.payload.todoId] : [newTask, ...state[action.payload.todoId]]
            };
        }
        case ACTION_TYPE.TASK.REMOVE_TASK: {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(t => {
                    return (
                        t.taskId !== action.payload.taskId
                    );
                })
            };
        }
        case ACTION_TYPE.TASK.CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.payload.todoId] : state[action.payload.todoId].map(t => {
                    return (
                        t.taskId === action.payload.taskId
                            ? {...t, isDone: action.payload.isDone}
                            : t
                    );
                })
            };
        }
        case ACTION_TYPE.TASK.UPDATE_TASK_TITLE: {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(t => {
                    return (
                        t.name === action.payload.name
                            ? {...t, name: action.payload.name}
                            : t
                    );
                })
            };
        }
        case ACTION_TYPE.TODOLIST.ADD_TODOLIST: {
            return {...state, [action.payload.todoId] : []}
        }
        case ACTION_TYPE.TODOLIST.REMOVE_TODOLIST: {
            /*const copyState = {...state}
            delete copyState[action.payload.todoId]*/

            const {[action.payload.todoId] : deletedTasks, ...deletedState} = state;
            return deletedState;
        }
        default: {
            return state;
        }
    }

}

export const addTaskAC = (todoId: string, title: string) => ({
    type: ACTION_TYPE.TASK.ADD_TASK,
    payload: {
        todoId,
        taskId: v1(),
        title
    }
} as const);

export const removeTaskAC = (todoId: string, taskId: string) => ({
    type: ACTION_TYPE.TASK.REMOVE_TASK,
    payload: {
        todoId,
        taskId
    }
}as const);

export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean) => ({
    type: ACTION_TYPE.TASK.CHANGE_TASK_STATUS,
    payload: {
        todoId,
        taskId,
        isDone
    }
}as const);

export const updateTaskTitleAC = (todoId: string, taskId: string, name: string) => ({
    type: ACTION_TYPE.TASK.UPDATE_TASK_TITLE,
    payload: {
        todoId,
        taskId,
        name
    }
}as const);

