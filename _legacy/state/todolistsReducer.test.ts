import {v1} from "uuid";

import {FilterValuesType, TodolistStateType} from "../App";
import {
    todolistsReducer,
    removeTodolistAC,
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC
} from "./todolistsReducer";

let todoListId_1: string
let todoListId_2: string
let startState: Array<TodolistStateType>

beforeEach(()=>{
    todoListId_1 = v1();
    todoListId_2 = v1();
    startState = [
        {id: todoListId_1, title: "what to learn", filter: "All"},
        {id: todoListId_2, title: "what to bye", filter: "All"},
    ];
});

//remove todolist:
test("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todoListId_1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId_2);
});

//add todolist:
test("correct todolist should added", () => {
    const newTodoTittle =  "NewTodoTittle"
    const endState = todolistsReducer(startState, addTodoAC(newTodoTittle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoTittle);
    expect(endState[0].filter).toBe("All");
});

//change todolist filter:
test("correct filter of todolist should be changed", () => {
    const newFilter: FilterValuesType = "Completed";
    const endState = todolistsReducer(startState, changeTodoFilterAC(todoListId_2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});

//change todolist tittle:
test("correct todolist should change its name", () => {
    const newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, changeTodoTitleAC(todoListId_2, newTodolistTitle));

    expect(endState[0].title).toBe("what to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});



