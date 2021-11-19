import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {todolistAPI} from './../api/todolist-api'

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '809d50f8-0790-4db8-ac8b-7ff6bbc71c22'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',
            settings)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                title:
                    "newTodolist"
            }, settings).then((res) => {
                setState(res.data);
            })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }
export const DeleteTodolist =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            const todolistId = 'a2eed438-ae91-412a-8176-e86654ff2725';
            axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                settings).then((res) => {
                    setState(res.data);
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