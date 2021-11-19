import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '809d50f8-0790-4db8-ac8b-7ff6bbc71c22'
    }
}
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise =
            axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId
                }`, { title: title }, settings)
        return promise
    }
}