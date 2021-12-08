import { TasksStateType } from '../AppWithRedux'
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer'
import { TaskType, TaskStatuses, TaskPriorities } from './../api/todolist-api'
import { Dispatch } from 'redux'
import { todolistsAPI } from '../api/todolist-api';
import {AppRootStateType} from './store'



export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    status: TaskStatuses,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    todolistId: string
    title: string
}
////////////////////////////////////////////////////////////////////

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodolistsActionType |
    SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = { ...state }
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.id)
            return copyState
        }
        case 'ADD-TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy

        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.id ? { ...t, status: action.status } : t);
            return ({ ...state });
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.id ? { ...t, title: action.title } : t);
            return ({ ...state });
        }
        case 'ADD-TODOLIST':
            let todolistId = action.todolistId
            return { ...state, [todolistId]: [] }
        case 'REMOVE-TODOLIST': {
            let copyState = { ...state }
            delete copyState[action.id]
            return copyState
        }
        case 'SET-TODOLISTS': {
            const stateCopy = { ...state }
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', id: id, todolistId }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return { type: 'ADD-TASK', task }
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', id, status, todolistId }
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', id, title, todolistId }
}
//////////////////////////////////////////////////////
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return { type: 'SET-TASKS', tasks, todolistId }
}
export const removeTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, id)
        .then(res => {
            const action = removeTaskAC(id, todolistId)
            dispatch(action)
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            const action = removeTaskAC(title, todolistId)
            dispatch(action)
        })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не
        // только те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску
        // целиком  чтобы у неё отобрать остальные св-ва
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}