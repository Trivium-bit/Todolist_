import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { IconButton, Checkbox } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { TaskStatuses, TaskType } from '../../../../api/todolist-api'

export type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>

        <Checkbox
            color="primary"
            onChange={onChangeHandler}
            checked={props.task.status === TaskStatuses.Completed}
        />
        <EditableSpan value={props.task.title} onChange={onChangeTitleHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})