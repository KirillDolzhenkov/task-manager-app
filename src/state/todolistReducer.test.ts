import {v1} from "uuid";

import {FilterValuesType, TodolistStateType} from "../App";
import {todolistReducer} from "./todolistReducer";

test("correct todolist should be removed", () => {
    const TodoListId_1 = v1();
    const TodoListId_2 = v1();

    const startState: Array<TodolistStateType> = [
        {id: TodoListId_1, title: "what to learn", filter: "All"},
        {id: TodoListId_2, title: "what to bye", filter: "All"},
    ];

    const endState = todolistReducer(startState, {type: "TL/TODOLIST/REMOVE_TODOLIST", todoId: TodoListId_1});

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(TodoListId_2);
});

test("correct todolist should added", () => {
    const TodoListId_1 = v1();
    const TodoListId_2 = v1();

    const startState: Array<TodolistStateType> = [
        {id: TodoListId_1, title: "what to learn", filter: "All"},
        {id: TodoListId_2, title: "what to bye", filter: "All"},
    ];

    const newTodoTittle =  "NewTodoTittle"
    const endState = todolistReducer(startState, {type: "TL/TODOLIST/ADD_TODOLIST", tittle: newTodoTittle});

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoTittle);
    expect(endState[0].filter).toBe("All");
});

test("correct filter of todolist should be changed", () => {
    const TodoListId_1 = v1();
    const TodoListId_2 = v1();
    const newFilter: FilterValuesType = "Completed";

    const startState: Array<TodolistStateType> = [
        {id: TodoListId_1, title: "what to learn", filter: "All"},
        {id: TodoListId_2, title: "what to bye", filter: "All"},
    ];

    const endState = todolistReducer(startState, {type: "TL/TODOLIST/CHANGE_TODO_FILTER", todoId: TodoListId_2, filter: newFilter});

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});