import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
});

export const todolistApi = {
    getTodos() {
        return instance.get<TodosResponse[]>("todo-lists");
    },
    createTodos(title: string) {
        return instance.post<UniversalResponse<{item: TodosResponse}>>("todo-lists", {title});
    },
    deleteTodos(todolistId: string) {
        return instance.delete<UniversalResponse>(`todo-lists/${todolistId}`);
    },
    updateTodos(todolistId: string, title: string) {
        return instance.put<UniversalResponse>(`todo-lists/${todolistId}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<UniversalResponse<TasksResponse>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<UniversalResponse<TasksResponse>>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTasks(todolistId: string, taskId: string, title: string) {
        return instance.put<UniversalResponse<TasksResponse>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title});
    },
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TodosResponse = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type UniversalResponse<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TasksResponse = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TasksResponse[]
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}