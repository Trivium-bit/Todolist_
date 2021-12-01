import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/tasks-reducer';
import {todolistsReducer} from '../../state/todolists-reducer';
import {v1} from 'uuid'
import { AppRootStateType } from '../../state/store';
import {TaskStatuses, TaskPriorities} from '../../api/todolist-api'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
todolists: [
    { id: "todolistId1", title: "What to Learn", filter: "all", addedDate: "", order: 0 },
    { id: "todolistId2", title: "What to Buy", filter: "all", addedDate: "", order: 1 }
  ],
  tasks: {
    ["todolistId1"]: [
      { id: v1(), title: "HTML & CSS", status: TaskStatuses.New, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: ""},
      { id: v1(), title: "React", status: TaskStatuses.InProgress, description: "", priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: ""}
    ],
    ["todolistId2"]: [
      { id: v1(), title: "Bear",status: TaskStatuses.Completed, description: "", priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId2", order: 0, addedDate: ""},
      { id: v1(), title: "Pizza", status: TaskStatuses.New, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", todoListId: "todolistId2", order: 0, addedDate: ""}
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider
     store={storyBookStore}>{storyFn()}
     </Provider>
}

