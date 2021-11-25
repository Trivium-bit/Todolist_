import { title } from 'process'
import { useEffect, useState } from 'react'
import { todolistsAPI } from './../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState<string>("")
    const createTodolist = () => {
        todolistsAPI.createTodolist(todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistTitle"} value={todolistTitle} onChange={(e) => { setTodolistTitle(e.currentTarget.value) }} />
            <button onClick={createTodolist}>create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [todolistTitle, setTodolistTitle] = useState<string>("")

    const updateTodolist = () => {
        todolistsAPI.updateTodolist(todolistId, todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <input placeholder={"todolistTitle"} value={todolistTitle} onChange={(e) => { setTodolistTitle(e.currentTarget.value) }} />
            <button onClick={updateTodolist}>update todolist title</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <button onClick={getTasks}>get task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setodolistId(e.currentTarget.value) }} />
            <input placeholder={"taskId"} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setodolistId] = useState<string>("")
    const [taskTitle, setTaskTitle] = useState<string>("")

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setodolistId(e.currentTarget.value) }} />
            <input placeholder={"TaskTitle"} value={taskTitle} onChange={(e) => { setTaskTitle(e.currentTarget.value) }} />
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [completed, setCompleted] = useState<boolean>(false)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("null")
    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: "",
            deadline: ""
        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setodolistId(e.currentTarget.value) }} />
            <input placeholder={"taskId"} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
            <input placeholder={"Task Title"} value={title} onChange={(e) => { setTitle(e.currentTarget.value) }} />
            <input placeholder={"description"} value={description} onChange={(e) => { setDescription(e.currentTarget.value) }} />
            <input placeholder={"status"} value={status} type="number" onChange={(e) => { setStatus(+e.currentTarget.value) }} />
            <input placeholder={"priority"} value={priority} type="number" onChange={(e) => { setPriority(+e.currentTarget.value) }} />

            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}
