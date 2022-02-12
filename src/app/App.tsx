import React from 'react'
import './App.css'
import { AppBar, Container, IconButton, Toolbar, Typography, LinearProgress } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import Button from '@mui/material/Button';
import { AppRootStateType } from './store';
import { useDispatch, useSelector } from 'react-redux'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { RequestStatusType } from './app-reducer'
import { Login } from '../features/login/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <BrowserRouter>
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
                    <Routes>
                        <Route path="/" element={<TodolistsList />} />
                        <Route path="login" element={<Login />} />
                        <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
