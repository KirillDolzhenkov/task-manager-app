import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasksReducer";
import {TasksStateType} from "../App";
import {addTodoAC} from "./todolistsReducer";

let todoListId_1: string
let todoListId_2: string
let startState: TasksStateType

beforeEach(()=>{
    todoListId_1 = v1();
    todoListId_2 = v1();
    startState = {
        [todoListId_1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todoListId_2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
});

//addTask:
test("correct task should be deleted", () => {
    const action = removeTaskAC("2", todoListId_2);
    const endState = tasksReducer(startState, action);

    //expect(endState[todoListId_1].length).toBe(3);
    //expect(endState[todoListId_2].length).toBe(2);
    //expect(endState[todoListId_2].every(t => t.id !== "2")).toBeTruthy();

    expect(endState).toEqual({
        [todoListId_1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todoListId_2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
});

//deleteTask:
test('correct task should be added to correct array', () => {
    const action = addTaskAC('juce', todoListId_2);
    const endState = tasksReducer(startState, action);

    expect(endState[todoListId_1].length).toBe(3);
    expect(endState[todoListId_2].length).toBe(4);
    expect(endState[todoListId_2][0].id).toBeDefined();
    expect(endState[todoListId_2][0].title).toBe('juce');
    expect(endState[todoListId_2][0].isDone).toBe(false);
});

//changeStatus:
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', false, todoListId_2);
    const endState = tasksReducer(startState, action);

    expect(endState[todoListId_1][1].isDone).toBe(true);
    expect(endState[todoListId_2][1].isDone).toBe(false);
});

//changeTitle:
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('2', "milk2", todoListId_2);
    const endState = tasksReducer(startState, action);

    expect(endState[todoListId_1][1].title).toBe("JS");
    expect(endState[todoListId_2][1].title).toBe("milk2");
});

//addTodo:
test('new array should be added when new todolist is added', () => {
    const action = addTodoAC('new todolist');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todoListId_1 && k != todoListId_2);
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});