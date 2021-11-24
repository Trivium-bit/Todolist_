import { title } from 'process'
import { useEffect, useState } from 'react'
import { todolistAPI } from './../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
            todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState<string>("")
          todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    return <div>{JSON.stringify(state)}
     <div>
            <input placeholder={"todolistTitle"} value={todolistTitle} onChange={(e) => { setTodolistTitle(e.currentTarget.value) }} />
            <button onClick={CreateTodolist}>create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTodolist = () => {
            todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    return <div>{JSON.stringify(state)}
      <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <button onClick={DeleteTodolist}>delete task</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [todolistTitle, setTodolistTitle] = useState<string>("")

    const updateTodolist = () => 
        todolistAPI.updateTodolist(todolistId, todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    return <div> {JSON.stringify(state)}
     <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <input placeholder={"todolistTitle"} value={todolistTitle} onChange={(e) => { setTodolistTitle(e.currentTarget.value) }} />
            <button onClick={UpdateTodolistTitle}>delete task</button>
        </div>
    </div>
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
    const [todolistId, setodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
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
        todolistAPI.createTask(todolistId, taskTitle)
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

/* export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c629c4a7-1784-4e7e-9125-c3c7611c4ea1'
        const taskId = '9b5df415-5c41-427e-bd38-8e4c1d53fafe'
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
} */