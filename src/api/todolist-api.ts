import axios from 'axios'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
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
        const promise = instance.post<CreateTodolistResponseType>(`/todo-lists`, { title: title })
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(`/todo-lists/${todolistId}`, { title: title })
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete(`/todo-lists/${todolistId}`)
        return promise
    }
}