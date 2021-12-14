import React, { useEffect, useCallback } from 'react';
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {changeTodolistFilterAC, fetchTodolistsTC, deleteTodolistTC, addTodolistTC, changeTodolistTitleTC} from './state/todolists-reducer';
import { addTaskTC, updateTaskTC, removeTaskTC} from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { TaskType, TaskStatuses, TodolistDomainType, FilterValuesType} from './api/todolist-api';
import {Todolist} from './TodoList'
import {AddItemForm} from './AddItemForm';
import {Menu} from "@material-ui/icons";
import { AppRootStateType } from './state/store';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {

  useEffect(() => {
      dispatch(fetchTodolistsTC)
  })

  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();

  
  const addTask = useCallback(function(title: string, todolistId: string) {
    const thunk = addTaskTC(title, todolistId);
    dispatch(thunk);
    },[]);

  const removeTask= useCallback(function(id: string, todolistId: string) {
      const thunk = removeTaskTC(id, todolistId);
        dispatch(thunk);
  },[]);

  const changeFilter = useCallback(function(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  },[]);

  const changeStatus = useCallback(function(id: string, status: TaskStatuses, todolistId: string) {
    const thunk = updateTaskTC(id, {status}, todolistId);
    dispatch(thunk);
  },[]);

  const changeTaskTitle = useCallback(function(taskId: string, newTitle: string, todolistId: string) {
    const thunk = updateTaskTC(taskId, {title: newTitle}, todolistId);
    dispatch(thunk);
  },[]);

  const removeTodolist = useCallback(function(todolistId: string) {
    const thunk = deleteTodolistTC(todolistId);
    dispatch(thunk);
  },[]); 
  

  const changeTodolistTitle = useCallback(function(todolistId: string, title: string) {
    const thunk = changeTodolistTitleTC(todolistId, title);
    dispatch(thunk);
    },[]);

  const addTodolist = useCallback((title: string) => {
       const thunk = addTodolistTC(title);
    dispatch(thunk);
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
            tasksForTodolists = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
          }
          if (tl.filter === "completed") {
            tasksForTodolists = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
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
