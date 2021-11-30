import { TasksStateType } from '../AppWithRedux'
import { v1 } from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'
<<<<<<< HEAD
import {TaskType, TaskStatuses, TaskPriorities} from './../api/todolist-api'
import { Todolist } from '../Todolist';
=======
import {TaskPriorities, TaskType} from './../api/todolist-api'
>>>>>>> 7d0325a78d8211216bc9818cf9ef07808c1e8fc5
import {Dispatch} from 'redux'
import { todolistsAPI } from '../api/todolist-api';
import { TaskStatuses } from '../api/todolist-api';


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
<<<<<<< HEAD
=======
            const stateCopy = {...state}
>>>>>>> 7d0325a78d8211216bc9818cf9ef07808c1e8fc5
            let newTask = {
                id: v1(),
                title: action.title,
                description: '',
                status: TaskStatuses.New,
<<<<<<< HEAD
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: action.todolistId,
                order: 1,
                addedDate: ''
             };
            return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] }
=======
                priority: TaskPriorities.Midlle,
                startDate: '',
                deadline: '',
                todoListId: action.todolistId,
                order: 0,
                addedDate: ''};
                const tasks = stateCopy[action.todolistId];
                const newTasks = [newTask,...tasks];
                stateCopy[action.todolistId] = newTasks;
                return stateCopy
           
>>>>>>> 7d0325a78d8211216bc9818cf9ef07808c1e8fc5
        }
        case 'CHANGE-TASK-STATUS': {
           let todolistTasks = state[action.todolistId];
           state[action.todolistId] = todolistTasks
           .map(t => t.id === action.id ? {...t, status: action.status} : t);
           return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
           state[action.todolistId] = todolistTasks
           .map(t => t.id === action.id ? {...t, title: action.title} : t);
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
        case 'SET-TASKS': {
            const stateCopy = {...state}
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
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId }
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', id, status, todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', id, title, todolistId }
}
//////////////////////////////////////////////////////
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
        .then((res)=> {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
        })
    }
}