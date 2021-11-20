import axios from 'axios'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D> = {
resultCode: number
messages: Array<string>
data: D
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

type getTasksResponse = {
error: string | null
totalCount: number
items: TaskType[]
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
        const promise = instance.get<Array<TodolistType>>(`/todo-lists`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>(`/todo-lists`, { title: title })
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, { title: title })
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
        return promise
    },
    getTasks(todolistId:string) {
        return instance.get<getTasksResponse>(`/todo-lists/${todolistId}/tasks`);
    },
}