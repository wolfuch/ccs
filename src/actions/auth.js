import { fetchSinToken } from '../helpers/fetch-helpers';
import { types } from '../types/types';

export const iniciarLogin = ( email, password, callbackurl ) => {
    return async( dispatch ) => {

        try {
            const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
            const body = await resp.json();
    
            if( body.success === 'OK') {
                
                dispatch( login({
                    uid: body.resultado.idUsuario,
                    nombre: body.resultado.nombre
                }) );

                window.location.href = `${ callbackurl }?t=${body.resultado.token}&n=${body.resultado.nombre}&uid=${body.resultado.idUsuario}&email=${body.resultado.email}`;

            } else {
                console.log(body?.errores[0].descripcion);
            }
        } catch(e) {
            console.log('error');
        }   
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});
