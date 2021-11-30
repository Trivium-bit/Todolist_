import React, {ChangeEvent, useCallback} from 'react';
<<<<<<< HEAD
import {TaskType, TaskStatuses} from './api/todolist-api'
=======
>>>>>>> 7d0325a78d8211216bc9818cf9ef07808c1e8fc5
import {EditableSpan} from './EditableSpan'
import {IconButton, Checkbox} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import { TaskStatuses, TaskType } from './api/todolist-api'

export type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
  
    const onClickHandler = () => {props.removeTask(props.task.id, props.todolistId)}
    const newIsDoneValue = (e: ChangeEvent<HTMLInputElement>) => { props.changeStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)}
    const onChangeTitleHandler = useCallback((newTitle: string) => {
       props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    },[props.changeTaskTitle,props.task.id,props.todolistId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        
        <Checkbox
         color="primary"
         onChange={newIsDoneValue}
<<<<<<< HEAD
         checked={props.task.status}
=======
         checked={props.task.status === TaskStatuses.Completed}
>>>>>>> 7d0325a78d8211216bc9818cf9ef07808c1e8fc5
         />
        <EditableSpan value={props.task.title} onChange={onChangeTitleHandler} />
        <IconButton onClick={onClickHandler}>
<Delete/>
</IconButton>
</div>
})