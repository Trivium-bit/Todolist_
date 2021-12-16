import React, { useEffect, useCallback } from 'react';
import { AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper } from '@material-ui/core';
import TodolistList from '../features/TodolistsList/TodolistList'
import { Menu } from "@material-ui/icons";

export function App() {
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
        <TodolistList />
      </Container>
    </div>
  );
}

export default App;