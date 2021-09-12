import { types } from '../types/types';

const initialState = {
    paso: 1
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.authLoginConUno:
            return {
                ...state,
                ...action.payload
            }

            case types.authLoginConMas:
            return {
                ...state,
                ...action.payload,
                paso: 2
            }


        case types.authLogout:
            return {
                checking: false
            }


        default:
            return state;
    }

}


