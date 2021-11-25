import { TasksStateType } from '../App'
import { v1 } from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    isDone: boolean,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    todolistId: string
    title: string
}


type ActionsType = RemoveTaskActionType |
                   AddTaskActionType | 
                   ChangeTaskStatusActionType |
                   ChangeTaskTitleActionType | 
                   AddTodolistActionType | 
                   RemoveTodolistActionType |
                   SetTodolistsActionType
                   
const initialState: TasksStateType = {}                   
              
                   
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = { ...state }
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.id)
            return copyState
        }
        case 'ADD-TASK': {
            let newTask = { id: v1(), title: action.title, isDone: false };
            return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] }
        }
        case 'CHANGE-TASK-STATUS': {
           let todolistTasks = state[action.todolistId];
           state[action.todolistId] = todolistTasks
           .map(t => t.id === action.id 
                ? {...t, isDone: action.isDone}
                : t);
           return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
           state[action.todolistId] = todolistTasks
           .map(t => t.id === action.id 
                ? {...t, title: action.title}
                : t);
           return ({...state});
        }    
        case 'ADD-TODOLIST':
           let todolistId = action.todolistId
           return {...state, [todolistId]: [] }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        default:
            return state
    }
}
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', id: id, todolistId }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId }
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', id, isDone, todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', id, title, todolistId }
}
