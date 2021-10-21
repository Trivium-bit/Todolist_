import React, { useState, useReducer } from 'react';
import { Todolist } from './Todolist'
import './App.css';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import { AddTodolistAC, todolistsReducer, ChangeTodolistTitleAC, RemoveTodolistAC, ChangeTodolistFilterAC } from './state/todolists-reducer';
import { tasksReducer, addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './state/tasks-reducer';

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolist] = useReducer(todolistsReducer,[
    { id: todolistId1, title: "What to Learn", filter: "all" },
    { id: todolistId2, title: "What to Buy", filter: "all" }
  ])

  let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    [todolistId1]: [
      { id: v1(), title: "HTML & CSS", isDone: true },
      { id: v1(), title: "React", isDone: true }
    ],
    [todolistId2]: [
      { id: v1(), title: "Bear", isDone: true },
      { id: v1(), title: "Pizza", isDone: true }
    ]
  })

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatchToTasks(action);
    
  }

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatchToTasks(action);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = ChangeTodolistFilterAC(todolistId, value);
    dispatchToTodolist(action);
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(id, isDone, todolistId);
    dispatchToTasks(action);
  }
  
  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(id, newTitle, todolistId);
    dispatchToTasks(action);
  }
  

  function removeTodolist(todolistId: string) {
    const action = RemoveTodolistAC(todolistId);
    dispatchToTodolist(action);
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const action = ChangeTodolistTitleAC(todolistId, newTitle);
    dispatchToTodolist(action);
    }

  function addTodolist(title: string) {
    const action = AddTodolistAC(title);
    dispatchToTasks(action);
    dispatchToTodolist(action);
  }

  return (
    <div className="App">
      <AppBar position="static">
      
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
      <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
      {
        todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id]
          let tasksForTodolists = allTodolistTasks
          if (tl.filter === "active") {
            tasksForTodolists = allTodolistTasks.filter(t => t.isDone === false)
          }
          if (tl.filter === "completed") {
            tasksForTodolists = allTodolistTasks.filter(t => t.isDone === true)
          }
          return <Grid item>
            <Paper style={{padding: "10px"}}>
            <Todolist
            todolistId={tl.id}
            key={tl.id}
            title={tl.title}
            tasks={tasksForTodolists}
            removeTask={removeTask}
            addTask={addTask}
            changeFilter={changeFilter}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
          </Paper>
            </Grid>
        })
      }
       </Grid>
      </Container>
    </div>
  );
    }
  
export default AppWithReducers;
