import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string

}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}


export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolistId = action.todolistId
            const newTodoList: TodoListType = {id: newTodolistId, title: action.title, filter: "all"}
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...todoLists]
            }
            return todoLists
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...todoLists]
            }
            return todoLists
        }
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER',  id: id, filter: filter}

}

