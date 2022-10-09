import {v1} from "uuid";
import {addTaskAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {TasksStateType} from "../App";

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