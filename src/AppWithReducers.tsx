import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    todolistsReducer,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    AddTodoListAC,
    ChangeTodoListTitleAC
} from "./state/todolists-reducer";
import {addTaskAC, removeTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC} from "./state/task-reducer";

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

function AppWithReducers() {
/////////BLL (state и функции):
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListID_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Pizza", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Burger", isDone: true}
        ]
    });

    function removeTask(taskId: string, todolistId: string) {
      let action = removeTaskAC(taskId, todolistId)
        dispatchToTasks(action)
    }

    function addTask(title: string, todolistId: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        let action = addTaskAC(title, todolistId)
        dispatchToTasks(action)
    }
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        let action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchToTasks(action)
        }


    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        let action = changeTaskTitleAC(taskId, title, todolistId)
        dispatchToTasks(action)
    }

    function changeTodoListFilter(id: string, filter: FilterValuesType) {
        let action = ChangeTodoListFilterAC(id, filter)
        dispatchTodolists(action)
    }

    function removeTodoList(id: string) {
        let action = RemoveTodoListAC(id)
        dispatchTodolists(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchTodolists(action)
    }

    function changeTodoListTitle(id: string, title: string) {
        let action = ChangeTodoListTitleAC(id, title)
        dispatchTodolists(action)
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

export default AppWithReducers;

