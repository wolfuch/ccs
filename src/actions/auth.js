import { fetchSinToken } from '../helpers/fetch-helpers';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';

export const iniciarLogin = ( email, password, callbackurl ) => {
    
    return async( dispatch ) => {

        try {
            dispatch(startLoading());

            const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
            const body = await resp.json();
            
            console.log(body);

            dispatch(finishLoading());

            if( body.success === 'OK') {
                
                if (body.resultado.listadoSistemas.length > 1)
                    dispatch(login({
                        uid: body.resultado.idUsuario,
                        nombre: body.resultado.nombre,
                        listadoSistemas: body.resultado.listadoSistemas
                    }));
                else
                    window.location.href = `${ callbackurl }?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;

            } else {
                Swal.fire({
                    title: "Autenticacion",
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
                title: "Autenticacion",
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

const login = ( user ) => ({
    type: types.authLoginConMas,
    payload: user
});
