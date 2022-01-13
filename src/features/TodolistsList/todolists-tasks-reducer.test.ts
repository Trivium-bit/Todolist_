import { TodolistDomainType, TodolistType } from './../../api/todolist-api';
import { TasksStateType } from './../../api/todolist-api'
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer, addTodolistAC } from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist: TodolistType = {
        id: "todolistId2",
        title: "NEW YEAR!",
        order: 0,
        addedDate: ""
    }

    const action = addTodolistAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});