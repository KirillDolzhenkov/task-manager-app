import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {TasksStateType} from "../App";
import {addTodoAC} from "./todolistsReducer";



//addTask:
test("correct task should be deleted", () => {
    const TodoListId_1 = v1();
    const TodoListId_2 = v1();
    const startState: TasksStateType = {
        [TodoListId_1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        [TodoListId_2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Bread", isDone: true},
            {id: "3", title: "Coffee", isDone: false},
        ],
    };

    const action = removeTaskAC("2", TodoListId_2);
    const endState = tasksReducer(startState, action);

    //expect(endState[TodoListId_1].length).toBe(3);
    //expect(endState[TodoListId_2].length).toBe(2);
    //expect(endState[TodoListId_2].every(t => t.id !== "2")).toBeTruthy();

    expect(endState).toEqual({
        [TodoListId_1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        [TodoListId_2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "3", title: "Coffee", isDone: false},
        ],
    })
});

//deleteTask:
test('correct task should be added to correct array', () => {
    const TodoListId_1 = v1();
    const TodoListId_2 = v1();
    const startState: TasksStateType = {
        [TodoListId_1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        [TodoListId_2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Bread", isDone: true},
            {id: "3", title: "Coffee", isDone: false},
        ],
    };

    const action = addTaskAC('juce', TodoListId_2);
    const endState = tasksReducer(startState, action);

    expect(endState[TodoListId_1].length).toBe(3)
    expect(endState[TodoListId_2].length).toBe(4)
    expect(endState[TodoListId_2][0].id).toBeDefined()
    expect(endState[TodoListId_2][0].title).toBe('juce')
    expect(endState[TodoListId_2][0].isDone).toBe(false)
})

//changeStatus:
test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].isDone).toBe(true);
    expect(endState['todolistId2'][1].isDone).toBe(false);
});

//changeTitle:
test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskTitleAC('2', "milk2", 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].title).toBe("JS");
    expect(endState['todolistId2'][1].title).toBe("milk2");
});

//addTodo:
test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodoAC('new todolist')
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})