import React from 'react'
import './App.css'
import { AppBar, Container, IconButton, Toolbar, Typography, LinearProgress } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import Button from '@mui/material/Button';
import { AppRootStateType } from './store';
import { useDispatch, useSelector } from 'react-redux'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'

function App() {

    const status = useSelector<AppRootStateType>(state => state.app.status)
    
    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="secondary" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button variant="contained" color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary" />}
            </AppBar>
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    )
}

export default App
