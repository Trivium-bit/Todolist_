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
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "TAAAAAAAAAAAAASSSSKKKKKKKKK"
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8e793331-eb1d-442f-ac05-26ef02c0f80f';
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
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
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'c629c4a7-1784-4e7e-9125-c3c7611c4ea1'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c629c4a7-1784-4e7e-9125-c3c7611c4ea1'
        const taskId = '9b5df415-5c41-427e-bd38-8e4c1d53fafe'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const PostTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c629c4a7-1784-4e7e-9125-c3c7611c4ea1'
        todolistAPI.postTask(todolistId, "Marvel")
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}