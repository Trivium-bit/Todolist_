import React, { useState } from 'react';
import { Todolist } from './TodoList'
import './App.css';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";


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

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to Learn", filter: "all" },
    { id: todolistId2, title: "What to Buy", filter: "all" }
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
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
    let task = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks]
    setTasks({ ...tasks });
  }

  function removeTask(id: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
    setTasks({ ...tasks })
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasks })
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
      task.title = newTitle
      setTasks({ ...tasks })
    }
  }

  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasks[todolistId]
    setTasks({ ...tasks });
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = { id: newTodolistId, title: title, filter: 'all' };
    setTodolists([newTodolist, ...todolists])
    setTasks({
      ...tasks,
      [newTodolistId]: []
    })
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

export default App;
