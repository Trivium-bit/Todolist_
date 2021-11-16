import React, { useCallback } from 'react';
import { Todolist } from './Todolist'
import './App.css';
import { AddItemForm } from './AddItemForm';
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import { AddTodolistAC, ChangeTodolistTitleAC, RemoveTodolistAC, ChangeTodolistFilterAC } from './state/todolists-reducer';
import { addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

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

export function AppWithRedux() {


  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch();

  const addTask = useCallback(function(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatch(action);
    },[]);

  const removeTask= useCallback(function(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatch(action);
  },[]);

  const changeFilter = useCallback(function(value: FilterValuesType, todolistId: string) {
    const action = ChangeTodolistFilterAC(todolistId, value);
    dispatch(action);
  },[]);

  const changeStatus = useCallback(function(id: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(id, isDone, todolistId);
    dispatch(action);
  },[]);
  
  const changeTaskTitle = useCallback(function(id: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(id, newTitle, todolistId);
    dispatch(action);
  },[]);
  

  const removeTodolist = useCallback(function(todolistId: string) {
    const action = RemoveTodolistAC(todolistId);
    dispatch(action);
  },[]);

  const changeTodolistTitle = useCallback(function(todolistId: string, newTitle: string) {
    const action = ChangeTodolistTitleAC(todolistId, newTitle);
    dispatch(action);
    },[]);

  const addTodolist = useCallback((title: string) => {
       const action = AddTodolistAC(title);
    dispatch(action);
   }, [dispatch]);

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
          let allTodolistTasks = tasks[tl.id];
          let tasksForTodolists = allTodolistTasks;
          
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
  
export default AppWithRedux;
