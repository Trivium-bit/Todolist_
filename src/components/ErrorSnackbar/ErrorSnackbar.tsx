import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'
import { AppRootStateType } from './../../app/store'
import {setAppErrorAC} from './../../app/app-reducer'

const error = useSelector<AppRootStateType>(state => state.app.error)


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const [open, setOpen] = React.useState(true)
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return setAppErrorAC(null)
        }
        setOpen(false)
    }

    return (
        <Snackbar open={error !== null } autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" >
            </Alert>
        </Snackbar>
    )
}