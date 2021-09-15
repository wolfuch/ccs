import { types } from "../types/types"


export const startLoading = () => ({
    type: types.uiStartLoading
});

export const finishLoading = () => ({
    type: types.uiFinishLoading
});

export const showLogin = () => ({
    type: types.uiScreenLogin
})

export const showRecoveryPassword = () => ({
    type: types.uiScreenRecovery
})

export const showChangePassword = () => ({
    type: types.uiScreenChangePassword
})

export const showMultipleSystem = () => ({
    type: types.uiScreenShowSystem
})