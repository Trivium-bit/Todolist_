import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {todolistsReducer, changeTodoListFilterAC, removeTodoListAC, addTodoListAC, changeTodoListTitleAC} from "./state/todolists-reducer";
import {addTaskAC, removeTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootStateType } from './state/store';

////////////// Типизация
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    // let todoListID_1 = v1()
    // let todoListID_2 = v1()
    //
    // let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
    //     {id: todoListID_1, title: "What to learn", filter: "all"},
    //     {id: todoListID_2, title: "What to buy", filter: "all"},
    // ])
    //
    // let [tasks, dispatchTasks] = useReducer(tasksReducer,{
    //     [todoListID_1]: [
    //         {id: v1(), title: "JS", isDone: false},
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "CSS", isDone: true}
    //     ],
    //     [todoListID_2]: [
    //         {id: v1(), title: "Pizza", isDone: false},
    //         {id: v1(), title: "Beer", isDone: true},
    //         {id: v1(), title: "Burger", isDone: true}
    //     ]
    // });
    let todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    let dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
      let action = removeTaskAC(id, todolistId)
        dispatch(action)
    }

    function addTask(title: string, todolistId: string) {
        let action = addTaskAC(title, todolistId)
        dispatch(action)
    }
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
        }


    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }

    function changeTodoListFilter(id: string, filter: FilterValuesType) {
        let action = changeTodoListFilterAC(id, filter)
        dispatch(action)
    }

    function removeTodoList(id: string) {
        let action = removeTodoListAC(id)
        dispatch(action)
        }

    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatch(action)
    }

    function changeTodoListTitle(id: string, title: string) {
        let action = changeTodoListTitleAC(id, title)
        dispatch(action)
    }

    /////////////// UI

    const todoListComponents = todoLists.map(tl => {
        let taskForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: "20px"}}>
                    <TodoList
                        title={tl.title}
                        tasks={taskForTodoList}
                        todoListID={tl.id}
                        filter={tl.filter}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;

