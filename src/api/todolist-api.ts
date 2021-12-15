import axios from 'axios'
import {UpdateDomainTaskModelType} from './../state/tasks-reducer'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '809d50f8-0790-4db8-ac8b-7ff6bbc71c22'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`);
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title: title });
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: title });
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, { title: taskTitle });
    },
    updateTask(todolistId: string, taskId: string, apiModel: UpdateDomainTaskModelType) {
        return instance.put<UpdateTasksResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, apiModel);
    },
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TodolistDomainType = TodolistType & {filter: FilterValuesType};
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Midlle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
type ResponseType<Data = {}> = {  // (по умолчанию) <Data={}> если Data не передавать то он пустой объект
    resultCode: number
    messages: Array<string>
    data: Data
}
export type TaskType = {
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
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
type UpdateTasksResponse = {
    error: string | null
    totalCount: number
    items: UpdateTaskModelType[]
}