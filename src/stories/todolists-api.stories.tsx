import { useEffect, useState } from 'react'
import { todolistAPI } from './../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        debugger
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            const title = "New Vegas"
            todolistAPI.createTodolist(title)
                .then((res) => {
                    setState(res.data)
                })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }
export const DeleteTodolist =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            const todolistId = 'fc063e38-f8cc-4d9a-a23c-1af650230adb';
            todolistAPI.deleteTodolist(todolistId)
                .then((res) => {
                    setState(res.data)
                })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }

export const UpdateTodolistTitle =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            const todolistId = 'fc063e38-f8cc-4d9a-a23c-1af650230adb'
            todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
                .then((res) => {
                    setState(res.data)
                })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }