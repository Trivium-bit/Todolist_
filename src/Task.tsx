import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from './App'
import {EditableSpan} from './EditableSpan'
import {IconButton, Checkbox} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import { TaskStatuses } from './api/todolist-api';



export type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
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
         checked={props.task.isDone}
         />
        <EditableSpan value={props.task.title} onChange={onChangeTitleHandler} />
        <IconButton onClick={onClickHandler}>
<Delete/>
</IconButton>
</div>
})