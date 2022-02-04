export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//export type errorType = string | null

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>;

type ActionsType = SetAppStatusActionType | setAppErrorActionType

const initialState = {
    status: 'loading' as RequestStatusType,
    error: "ERROR"
}

type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: string) => ({ type: 'APP/SET-ERROR', error } as const)