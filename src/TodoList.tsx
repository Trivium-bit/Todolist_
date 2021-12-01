import React, {ChangeEvent, useCallback, useEffect} from 'react';
import { TaskStatuses, TaskType, FilterValuesType } from './api/todolist-api'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {IconButton, Checkbox, Button} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task'
import {fetchTasksTC} from './state/tasks-reducer'
import { useDispatch } from 'react-redux';


type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string ,newTitle: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo(function(props: PropsType) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC)
      
    })
    
    console.log("Todolist called")
    const addTask = useCallback((newTitle: string) => {
       props.addTask(newTitle, props.todolistId)
    }, [props.addTask,props.todolistId]);

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
     };

     const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
     },[props.todolistId, props.changeTodolistTitle]);

    const onAllClickHandler = useCallback( () => { props.changeFilter("all", props.todolistId) }, [props.changeFilter, props.todolistId]);
    const onActiveClickHandler = useCallback( () => { props.changeFilter("active", props.todolistId) }, [props.changeFilter, props.todolistId]);
    const onCompletedHandler = useCallback( () => { props.changeFilter("completed",props.todolistId) }, [props.changeFilter, props.todolistId]);

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
            <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}  />
        <div>
            {
                props.tasks.map(t => <Task
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    task={t}
                    todolistId={props.todolistId}
                    key={t.id}
                    />)
            }
        </div>
        <div>
            <Button variant={props.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={'default'}>All</Button>
            <Button variant={props.filter === "active" ? "outlined": "text"} onClick={onActiveClickHandler} color={'primary'}>Active</Button>
            <Button variant={props.filter === "completed" ? "outlined": "text"} onClick={onCompletedHandler} color={'secondary'}>Completed</Button>
        </div>
    </div>
}
)