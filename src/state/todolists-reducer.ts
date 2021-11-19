import { TodolistType, FilterValuesType } from '../App'
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

const initialState: Array<TodolistType> = []   

export const todolistsReducer = (todolists: Array<TodolistType> = initialState, action: ActionType) => {
    switch (action.type) {
            case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)   
        case 'ADD-TODOLIST':
            let newTodolist: TodolistType = { id: action.todolistId, title: action.title, filter: 'all' };
            return [...todolists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = todolists.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title;
                return [...todolists]
            }
            return todolists
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = todolists.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
                return [...todolists]
            }
            return todolists
        }
        default:
            return todolists;
    }
}

export const RemoveTodolistAC = (newTodolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: newTodolistId }
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId: v1() }
}
export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newTodolistTitle }
}
export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: newFilter }
}