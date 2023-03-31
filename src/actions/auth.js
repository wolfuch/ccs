import { fetchSinToken } from '../helpers/fetch-helpers';
import { types } from '../types/types';
import { finishLoading, showChangePassword, showLogin, showMultipleSystem, startLoading } from './ui';

import { MostrarMensaje } from '../helpers/MostrarMensaje';
import { RegistraIngreso } from '../helpers/auditoria';

export const iniciarLogin = (email, password, callbackurl = '', idSistema = 0) => {

    return async (dispatch) => {

        try {
            dispatch(startLoading());

            const resp = await fetchSinToken('auth', { email, password, idSistema }, 'POST');
            const body = await resp.json();

            dispatch(finishLoading());

            if (body.success === 'OK') {

                if (!body.resultado.contrasenaValidada) {
                    dispatch(login({
                        token: body.resultado.token,
                        nombre: body.resultado.nombre,
                        idUsuario: body.resultado.idUsuario,
                        email: body.resultado.email,
                        listadoSistemas: body.resultado.listadoSistemas
                    }));

                    dispatch(showChangePassword());
                } else {

                    console.log(`body.resultado.listadoSistemas`, body.resultado.listadoSistemas)
                    console.log(`callbackurl.url`, callbackurl.url)
                    if (callbackurl.url === '' && body.resultado.listadoSistemas.length > 1) {
                        console.log(body)
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
                    {
                        //RegistraLog
                        let data = {
                            email: body.resultado.email,
                            password: 'nada',
                            idUsuario: body.resultado.idUsuario,
                            idSistema: body.resultado.listadoSistemas[0].idSistema
                        } 
                        RegistraIngreso(data).then(() => {
                            window.location.href = ` ${body.resultado.listadoSistemas[0].urlSistema}?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;
                        })
                        // window.location.href = ` ${body.resultado.listadoSistemas[0].urlSistema}?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;
                    }

                    else
                        window.location.href = `${callbackurl.url}?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;
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
