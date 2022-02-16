import { Dispatch } from "react";
import { authAPI } from "../api/todolists-api";
import { setIsLoggedInAC, SetIsLoggedInActionType } from "../features/login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

export type SetAppInitializedActionType = ReturnType<typeof setAppInitialized>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;


type ActionsType = SetAppInitializedActionType | SetAppStatusActionType | SetAppErrorActionType

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export const initialState = {
    status: 'loading' as RequestStatusType,
    error: null,
    isInitialized: true

}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZED':
            return { ...state, isInitialized: action.value }
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}

export const initializeAppTC = () => (dispatch: Dispatch<SetIsLoggedInActionType>) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    })
}

export const setAppInitialized = (value: boolean) => ({ type: 'APP/SET-INITIALIZED', value } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: ErrorType) => ({ type: 'APP/SET-ERROR', error } as const)