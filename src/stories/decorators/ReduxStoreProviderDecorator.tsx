import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/tasks-reducer';
import {todolistsReducer} from '../../state/todolists-reducer';
import {v1} from 'uuid'
import { AppRootStateType } from '../../state/store';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
todolists: [
    { id: "todolistId1", title: "What to Learn", filter: "all" },
    { id: "todolistId2", title: "What to Buy", filter: "all" }
  ],
  tasks: {
    ["todolistId1"]: [
      { id: v1(), title: "HTML & CSS", isDone: true },
      { id: v1(), title: "React", isDone: true }
    ],
    ["todolistId2"]: [
      { id: v1(), title: "Bear", isDone: true },
      { id: v1(), title: "Pizza", isDone: true }
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider
     store={storyBookStore}>{storyFn()}
     </Provider>
}

