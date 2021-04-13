import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string

}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
let initialState: Array<TodoListType> = []

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const todolistsReducer = (todolists = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolistId = action.todolistId
            const newTodoList: TodoListType = {id: newTodolistId, title: action.title, filter: "all"}
            return [...todolists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = todolists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...todolists]
            }
            return todolists
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = todolists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...todolists]
            }
            return todolists
        }
        default:
            return todolists
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}

}

