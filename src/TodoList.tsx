import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todolistId: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("Todolist ")
    const addTask = useCallback((title: string) => {props.addTask(title, props.todoListID) },[props.todoListID, props.addTask])
    const removeTodoList = () => {props.removeTodoList(props.todoListID)}
    const changeTodoListTitle = (title: string) => {props.changeTodoListTitle(title, props.todoListID)}

    const setAllFilter = useCallback ( () => {
        props.changeTodoListFilter("all", props.todoListID)
    },[props.todoListID])
    const setActiveFilter = useCallback ( () =>  {
        props.changeTodoListFilter("active", props.todoListID)
    },[props.todoListID])
    const setCompletedFilter = useCallback(() => {
        props.changeTodoListFilter("completed", props.todoListID)
    },[props.todoListID])

    /// не работает фильтр тасок

    let tasksForTodoList = props.tasks;
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }
        const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(task.id, newTitle, props.todoListID)

        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"secondary"}
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                />
                {/*<input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}/>*/}
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                {/*<button onClick={removeTask}>x</button>*/}
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={removeTodoList}>X</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setAllFilter}>All
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    );
})