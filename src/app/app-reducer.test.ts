import { InitialStateType, appReducer, setAppErrorAC, setAppStatusAC } from './app-reducer'

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('some errors'))
    expect(endState.error).toBe('some errors');
})
test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'))
    expect(endState.status).toBe('loading');
})
