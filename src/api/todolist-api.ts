import axios from 'axios'
import { title } from 'process'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '809d50f8-0790-4db8-ac8b-7ff6bbc71c22'
    }
}
export const todolistAPI = {
    getTodolist() {
        const promise = axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, { title: title }, settings)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, { title: title }, settings)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    }
}