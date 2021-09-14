import { types } from "../types/types";

const initialState = {
    loading: false,
    paso: 1
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }

        case types.uiScreenLogin:
            return {
                ...state,
                paso: 1
            }

        case types.uiScreenRecovery:
            return {
                ...state,
                paso: 2
            }

        case types.uiScreenChangePassword:
            return {
                ...state,
                paso: 3
            }
        
            case types.uiScreenShowSystem:
            return {
                ...state,
                paso: 4
            }
            
        default:
            return state;
    }

}