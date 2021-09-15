import { fetchSinToken } from '../helpers/fetch-helpers';
import { types } from '../types/types';
import { finishLoading, showChangePassword, showLogin, showMultipleSystem, startLoading } from './ui';
import Swal from 'sweetalert2';

export const iniciarLogin = ( email, password, callbackurl = '') => {
    
    return async( dispatch ) => {

        try {
            dispatch(startLoading());

            const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
            const body = await resp.json();

            dispatch(finishLoading());

            if( body.success === 'OK') {

                if (!body.resultado.contrasenaValidada){
                    dispatch(login({
                        token: body.resultado.token,
                        nombre: body.resultado.nombre,
                        idUsuario: body.resultado.idUsuario,
                        email: body.resultado.email,
                        listadoSistemas: body.resultado.listadoSistemas
                    }));
                    dispatch(showChangePassword());
                }else{

                    if (callbackurl.url == '' && body.resultado.listadoSistemas.length > 1){
                            dispatch(login({
                                token: body.resultado.token,
                                nombre: body.resultado.nombre,
                                idUsuario: body.resultado.idUsuario,
                                email: body.resultado.email,
                                listadoSistemas: body.resultado.listadoSistemas
                            }));
    
                            dispatch(showMultipleSystem());
                        
                    }   
                    else
                        window.location.href = `${ callbackurl.url }?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;
                }

            } else {
                Swal.fire({
                    title: "Iniciar Sesión",
                    icon: "warning",
                    text: body?.errores[0].descripcion,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#083c70",
                    width: "40%",
                    padding: "2rem",
                    buttonsStyling: "false"
                });
                
            }
        } catch(e) {
            dispatch(finishLoading());
            Swal.fire({
                title: "Iniciar Sesión",
                icon: "error",
                text: "Se produjo un error vuelva a intentarlo.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#083c70",
                width: "40%",
                padding: "2rem",
                buttonsStyling: "false"
            });
        }   
    }
}

export const restablecerContrasena = ( email ) => {
    
    return async( dispatch ) => {

        try {
            dispatch(startLoading());

            const resp = await fetchSinToken( `auth/recoveryRequest/${email}`);
            const body = await resp.json();

            dispatch(finishLoading());

            if( body.success === 'OK') {

                Swal.fire({
                    title: "Reestablecer Contraseña.",
                    icon: "success",
                    text: 'Se ha enviado un correo con la nueva contraseña.',
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#083c70",
                    width: "40%",
                    padding: "2rem",
                    buttonsStyling: "false"
                });
                
                dispatch(showLogin());
                
            } else {
                Swal.fire({
                    title: "Reestablecer Contraseña.",
                    icon: "warning",
                    text: body?.errores[0].descripcion,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#083c70",
                    width: "40%",
                    padding: "2rem",
                    buttonsStyling: "false"
                });
                
            }
        } catch(e) {
            dispatch(finishLoading());
            Swal.fire({
                title: "Reestablecer Contraseña.",
                icon: "error",
                text: "Se produjo un error vuelva a intentarlo.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#083c70",
                width: "40%",
                padding: "2rem",
                buttonsStyling: "false"
            });
        }   
    }
}

export const cambiarContrasena = ( email, contrasenaActual, contrasenaNueva, callbackurl = '' ) => {
    
    return async( dispatch ) => {

        try {
            dispatch(startLoading());

            const resp = await fetchSinToken( `auth/recovery`, { email, contrasenaActual, contrasenaNueva }, 'POST');
            const body = await resp.json();

            dispatch(finishLoading());

            if( body.success === 'OK') {

                Swal.fire({
                    title: "Cambiar Contraseña.",
                    icon: "success",
                    text: 'Se ha cambiado la contraseña correctamente.',
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#083c70",
                    width: "40%",
                    padding: "2rem",
                    buttonsStyling: "false"
                }).then((result) => {
                    if (callbackurl.url == '' && body.resultado.listadoSistemas.length > 1){
                        dispatch(login({
                            token: body.resultado.token,
                            nombre: body.resultado.nombre,
                            idUsuario: body.resultado.idUsuario,
                            email: body.resultado.email,
                            listadoSistemas: body.resultado.listadoSistemas
                        }));

                        dispatch(showMultipleSystem());
                    
                }   
                else
                    window.location.href = `${ callbackurl.url }?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;
                  });
                
             
                
            } else {
                Swal.fire({
                    title: "Cambiar Contraseña.",
                    icon: "warning",
                    text: body?.errores[0].descripcion,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#083c70",
                    width: "40%",
                    padding: "2rem",
                    buttonsStyling: "false"
                });
                
            }
        } catch(e) {
            dispatch(finishLoading());
            Swal.fire({
                title: "Cambiar Contraseña.",
                icon: "error",
                text: "Se produjo un error vuelva a intentarlo.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#083c70",
                width: "40%",
                padding: "2rem",
                buttonsStyling: "false"
            });
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

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});
