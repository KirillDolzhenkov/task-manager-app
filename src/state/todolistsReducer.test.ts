import {v1} from "uuid";

import {FilterValuesType, TodolistStateType} from "../App";
import {
    todolistsReducer,
    TodoReducerAT,
    removeTodolistAC,
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC
} from "./todolistsReducer";

test("correct todolist should be removed", () => {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const startState: Array<TodolistStateType> = [
        {id: todoListId_1, title: "what to learn", filter: "All"},
        {id: todoListId_2, title: "what to bye", filter: "All"},
    ];

    /*const action: TodoReducerAT = {
        type: "TL/TODOLIST/REMOVE_TODOLIST",
        todoId: todoListId_1
    }*/
    const endState = todolistsReducer(startState, removeTodolistAC(todoListId_1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId_2);
});

test("correct todolist should added", () => {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const startState: Array<TodolistStateType> = [
        {id: todoListId_1, title: "what to learn", filter: "All"},
        {id: todoListId_2, title: "what to bye", filter: "All"},
    ];

    const newTodoTittle =  "NewTodoTittle"
    /*const action: TodoReducerAT = {type: "TL/TODOLIST/ADD_TODOLIST", tittle: newTodoTittle};*/
    const endState = todolistsReducer(startState, addTodoAC(newTodoTittle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoTittle);
    expect(endState[0].filter).toBe("All");
});

test("correct filter of todolist should be changed", () => {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const newFilter: FilterValuesType = "Completed";

    const startState: Array<TodolistStateType> = [
        {id: todoListId_1, title: "what to learn", filter: "All"},
        {id: todoListId_2, title: "what to bye", filter: "All"},
    ];

    /*const action: TodoReducerAT = {
        type: "TL/TODOLIST/CHANGE_TODO_FILTER",
        todoId: todoListId_2,
        filter: newFilter
    };*/
    const endState = todolistsReducer(startState, changeTodoFilterAC(todoListId_2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});

test("correct todolist should change its name", () => {
    let todoListId_1 = v1();
    let todoListId_2 = v1();
    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistStateType> = [
        {id: todoListId_1, title: "What to learn", filter: "All"},
        {id: todoListId_2, title: "What to buy", filter: "All"}
    ]

    /*const action: TodoReducerAT = {
        type: "TL/TODOLIST/CHANGE_TODO_TITLE",
        todoId: todoListId_2,
        title: newTodolistTitle
    }*/

    const endState = todolistsReducer(startState, changeTodoTitleAC(todoListId_2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});



