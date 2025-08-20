import { fetchSinToken } from '../helpers/fetch-helpers';
import { types } from '../types/types';
import { finishLoading, showChangePassword, showLogin, showMultipleSystem, startLoading } from './ui';

import { MostrarMensaje } from '../helpers/MostrarMensaje';
import { RegistraIngreso } from '../helpers/auditoria';

const urlPorSistema = {
    Proveedor: process.env.REACT_APP_URL_PROVEEDOR,
    Mandante: process.env.REACT_APP_URL_MANDANTE,
    BackOffice: process.env.REACT_APP_URL_BACKOFFICE
}
console.log('urlPorSistema', urlPorSistema)
const obtenerUrlSistema = (listadoSistemas) => {
    console.log('urlPorSistema dentroooo', urlPorSistema)
    const listadoFinal = listadoSistemas.map((sistema) => {
        return {
            ...sistema,
            urlSistema: urlPorSistema[sistema.nombreSistema] ?? sistema.nombreSistema
        }
    })
    return listadoFinal;
}

export const iniciarLogin = (email, password, callbackurl = '', idSistema = 0) => {

    return async (dispatch) => {

        try {
            dispatch(startLoading());

            const resp = await fetchSinToken('auth', { email, password, idSistema }, 'POST');
            const body = await resp.json();

            dispatch(finishLoading());
            console.log('body', body.resultado.listadoSistemas)
            console.log('callbackurl.url', callbackurl.url)
            if (body.success === 'OK') {

                if (!body.resultado.contrasenaValidada) {
                    dispatch(login({
                        token: body.resultado.token,
                        nombre: body.resultado.nombre,
                        idUsuario: body.resultado.idUsuario,
                        email: body.resultado.email,
                        cuenta: body.resultado.cuenta,
                        listadoSistemas: obtenerUrlSistema(body.resultado.listadoSistemas)
                    }));

                    dispatch(showChangePassword());
                } else {

                    if (callbackurl.url === '' && body.resultado.listadoSistemas.length > 1) {

                        dispatch(login({
                            token: body.resultado.token,
                            nombre: body.resultado.nombre,
                            idUsuario: body.resultado.idUsuario,
                            email: body.resultado.email,
                            cuenta: body.resultado.cuenta,
                            listadoSistemas: obtenerUrlSistema(body.resultado.listadoSistemas)
                        }));

                        dispatch(showMultipleSystem());

                    }
                    else if (callbackurl.url === '' && body.resultado.listadoSistemas.length === 1) {
                        //RegistraLog

                        let data = {
                            idUsuario: body.resultado.idUsuario,
                            idSistema: body.resultado.listadoSistemas[0].idSistema
                        }
                        let url = ""
                        if (body.resultado.listadoSistemas[0].idSistema === 1)
                            url = urlPorSistema.Proveedor
                        else if (body.resultado.listadoSistemas[0].idSistema === 2)
                            url = urlPorSistema.Mandante
                        else if (body.resultado.listadoSistemas[0].idSistema === 3)
                            url = urlPorSistema.BackOffice
                        
                        console.log('urlurlurlurl',url)
                        RegistraIngreso(data).then(() => {
                            window.location.href = ` ${url}?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;
                        })
                    }
                    else {

                        let idSistemaRetorno = 0

                        if (callbackurl.url.includes('proveedor'))
                            idSistemaRetorno = 1
                        if (callbackurl.url.includes('mandante'))
                            idSistemaRetorno = 2
                        if (callbackurl.url.includes('backoffice'))
                            idSistemaRetorno = 3

                        //RegistraLog
                        let data = {
                            idUsuario: body.resultado.idUsuario,
                            idSistema: idSistemaRetorno //body.resultado.listadoSistemas[0].idSistema
                        }

                        RegistraIngreso(data).then(() => {
                            window.location.href = `${callbackurl.url}?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;
                        })
                    }
                }

            } else {

                MostrarMensaje('Iniciar Sesión.', body?.errores[0].descripcion, 'warning')

            }
        } catch (e) {
            dispatch(finishLoading());

            MostrarMensaje('Iniciar Sesión.', 'Se produjo un error vuelva a intentarlo.', 'error')
        }
    }
}

export const restablecerContrasena = (email) => {

    return async (dispatch) => {

        try {
            dispatch(startLoading());

            const resp = await fetchSinToken(`auth/recoveryRequest/${email}`);
            const body = await resp.json();

            dispatch(finishLoading());

            if (body.success === 'OK') {

                MostrarMensaje('Cambiar Contraseña.', 'Se ha enviado un correo con la nueva contraseña.', 'success')

                dispatch(showLogin());

            } else {

                MostrarMensaje('Cambiar Contraseña.', body?.errores[0].descripcion, 'warning')

            }
        } catch (e) {
            dispatch(finishLoading());

            MostrarMensaje('Cambiar Contraseña.', 'Se produjo un error vuelva a intentarlo.', 'error')

        }
    }
}

export const cambiarContrasena = (email, contrasenaActual, contrasenaNueva, callbackurl = '') => {

    return async (dispatch) => {

        try {
            dispatch(startLoading());

            const resp = await fetchSinToken(`auth/recovery`, { email, contrasenaActual, contrasenaNueva }, 'POST');
            const body = await resp.json();

            dispatch(finishLoading());

            if (body.success === 'OK') {

                MostrarMensaje('Cambiar Contraseña.', 'Se ha cambiado la contraseña correctamente.', 'success', () => {
                    if (callbackurl.url === '' && body.resultado.listadoSistemas.length > 1) {
                        dispatch(login({
                            token: body.resultado.token,
                            nombre: body.resultado.nombre,
                            idUsuario: body.resultado.idUsuario,
                            email: body.resultado.email,
                            listadoSistemas: body.resultado.listadoSistemas
                        }));

                        dispatch(showMultipleSystem());

                    }
                    else if (callbackurl.url === '' && body.resultado.listadoSistemas.length === 1)
                        window.location.href = ` ${body.resultado.listadoSistemas[0].urlSistema}?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;
                    else
                        window.location.href = `${callbackurl.url}?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;
                })

            } else {
                MostrarMensaje('Cambiar Contraseña.', body?.errores[0].descripcion, 'warning');
            }
        } catch (e) {
            dispatch(finishLoading());

            MostrarMensaje('Cambiar Contraseña.', 'Se produjo un error vuelva a intentarlo.', 'error');
        }
    }
}

// export const recuperarContrasena = () => ({
//     type: types.authRecuperarContrasena
// })

// export const volverInicio = () => ({
//     type: types.authLoginConUno
// })

// export const restablecerContrasenaVentana = () => ({
//     type: types.authCambiarContrasena
// })

const login = (user) => ({
    type: types.authLogin,
    payload: user
});
