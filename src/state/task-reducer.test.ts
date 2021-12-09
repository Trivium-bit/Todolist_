import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, setTasksAC} from './tasks-reducer';
import {AddTodolistAC, RemoveTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskStatuses,TaskPriorities} from './../api/todolist-api';
import { TasksStateType } from '../AppWithRedux';

let startState: TasksStateType

beforeEach (() => {
     startState = {
        "todolistId1": [
            { id: "1", title: "CSS", description: "", status: TaskStatuses.New, priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: ""},
            { id: "2", title: "JS", description: "", status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: ""},
            { id: "3", title: "React", description: "", status: TaskStatuses.New, priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: ""},
        ],
        "todolistId2": [
            { id: "1", title: "bread", description: "", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: "", deadline: "", todoListId: "todolistId2", order: 0, addedDate: ""},
            { id: "2", title: "milk", description: "", status: TaskStatuses.Completed, priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId2", order: 0, addedDate: ""},
            { id: "3", title: "tea", description: "", status: TaskStatuses.New, priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId2", order: 0, addedDate: ""},
        ]
     }
})

test('correct task should be deleted from correct array', () => {
    
    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", description: "", status: TaskStatuses.New, priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: ""},
            { id: "2", title: "JS", description: "", status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: ""},
            { id: "3", title: "React", description: "", status: TaskStatuses.New, priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: ""},
        ],
        "todolistId2": [
            { id: "1", title: "bread", description: "", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: "", deadline: "", todoListId: "todolistId2", order: 0, addedDate: ""},
            { id: "3", title: "tea", description: "", status: TaskStatuses.New, priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId2", order: 0, addedDate: ""},
        ]
    });
});

test('correct task should be added to correct array', () => {
   
    const action = addTaskAC({ id: "1", title: "juce", description: "", status: TaskStatuses.New, priority: TaskPriorities.Midlle, startDate: "", deadline: "", todoListId: "todolistId2", order: 0, addedDate: ""});
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][1].title).toBe("bread");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
  
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('correct task should change its name', () => {
  
    const action = changeTaskTitleAC("2", "Bear", "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId2"][1].title).toBe("Bear");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
   
    const action = AddTodolistAC("new todolist");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
   
    const action = RemoveTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


test('empty arrays should be added when we set todolists', () => {
   
    const action = setTodolistsAC([
        { id: "1", title: "CSS", order: 0, addedDate: ""},
        { id: "2", title: "HTML", order: 1, addedDate: ""}
    ]);
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {
   
    const action = setTasksAC(startState["todolistId1"], "todolistId1");

    const endState = tasksReducer({
        "todolistId1": [],
        "todolistId2": [],
    }, action)
   
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});