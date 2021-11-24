import axios from 'axios'
import { title } from 'process'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<Data = {}> = {  // (по умолчанию) <Data={}> если Data не передавать то он пустой объект
    resultCode: number
    messages: Array<string>
    data: Data
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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
    status: number
    priority: number
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

export const todolistAPI = {
    getTodolist() {
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
    createTask(todolistId: string, Tasktitle: string) {
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, { title: Tasktitle });
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTasksResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
}