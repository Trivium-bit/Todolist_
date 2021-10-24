import React, {ChangeEvent, useCallback} from 'react';
import { TaskType } from './App'
import { FilterValuesType } from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {IconButton, Checkbox, Button} from '@material-ui/core'
import {Delete} from '@material-ui/icons'


type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string ,newTitle: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo(function(props: PropsType) {
    console.log("Todolist called")
    const addTask = useCallback((newTitle: string) => {
       props.addTask(newTitle, props.todolistId)
    }, []);

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
     }

     const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
     }

    const onAllClickHandler = () => { props.changeFilter("all", props.todolistId) };
    const onActiveClickHandler = () => { props.changeFilter("active", props.todolistId) };
    const onCompletedHandler = () => { props.changeFilter("completed",props.todolistId) };

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
            <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}  />
        <div>
            {
                props.tasks.map(t => {
                    
                    const onClickHandler = () => { props.removeTask(t.id, props.todolistId) }
                    const newIsDoneValue = (e: ChangeEvent<HTMLInputElement>) => { props.changeStatus(t.id, e.currentTarget.checked, props.todolistId)}
                    const onChangeTitleHandler = (newTitle: string) => {
                       props.changeTaskTitle(t.id, newTitle, props.todolistId)
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        
                        <Checkbox
                         color="primary"
                         onChange={newIsDoneValue}
                         checked={t.isDone}
                         />
                        <EditableSpan value={t.title} onChange={onChangeTitleHandler} />
                        <IconButton onClick={onClickHandler}>
            <Delete/>
            </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === "all" ? "outlined": "text"} onClick={onAllClickHandler} color={'default'}>All</Button>
            <Button variant={props.filter === "active" ? "outlined": "text"} onClick={onActiveClickHandler} color={'primary'}>Active</Button>
            <Button variant={props.filter === "completed" ? "outlined": "text"} onClick={onCompletedHandler} color={'secondary'}>Completed</Button>
        </div>
    </div>
}
)

