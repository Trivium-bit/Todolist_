import {TaskStateType, TaskType, TodoListType} from "../App"
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS_TASK'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type changeTaskTitleACActionType = {
    type: 'CHANGE-STATUS_TITLE'
    taskId: string
    title: string
    todolistId: string
}

export type ActionType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    changeTaskTitleACActionType |
    AddTodoListActionType |
    RemoveTodoListActionType

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...[action.todolistId]]}
        }
        case 'CHANGE-STATUS_TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case 'CHANGE-STATUS_TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }
        case 'ADD-TODOLIST':
           let todolistId = action.todolistId
           return {...state, [todolistId]: [] }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS_TASK', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleACActionType => {
    return {type: 'CHANGE-STATUS_TITLE', taskId, title, todolistId}
}