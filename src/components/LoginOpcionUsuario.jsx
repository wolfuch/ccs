import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showLogin } from '../actions/ui';
import { RegistraIngreso } from '../helpers/auditoria';
import { ObtenerNuevoToken } from '../actions/auth';
import { MostrarMensaje } from '../helpers/MostrarMensaje';

export const LoginOpcionUsuario = () => {

    const dispatch = useDispatch();

    const { listadoSistemas, token, nombre, idUsuario, email } = useSelector(state => state.auth);

    const handleBack = (e) => {
        e.preventDefault();
        dispatch(showLogin());
    }

    const  handleButtonSystem = async (e, sistema, idSistema) => {
        console.log("handleButtonSystem");
        console.log("handleButtonSystem idSistema", idSistema);
        e.preventDefault();
        //RegistraLog
        let data = {
            idUsuario: idUsuario ,
            idSistema: idSistema
        } 

        try {
            const nuevoToken = await ObtenerNuevoToken(token, idSistema);
            console.log("handleButtonSystem nuevoToken", nuevoToken);

            RegistraIngreso(data).then(() => {
                window.location.href = `${sistema}?t=${nuevoToken}&n=${nombre}&uid=${idUsuario}&email=${email}`;
            })
        } catch (error) {
            MostrarMensaje('Iniciar Sesión.', 'Se produjo un error vuelva a intentarlo.', 'error')
        }
    }

    return (

        <div className="cardAzul p-5" >
            <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
                <div className="col-md-12 col-xs-12 col-12 login-form-1">
                    <a><img src={process.env.PUBLIC_URL + '/img/logoFooter.svg'} className="img-fluid logo" alt="Responsive" ></img></a>
                    <p style={{ color: 'white', fontSize: '25px', margin: '25px' }}>Ingreso Usuario</p>
                </div>
                <div className="col-md-8">
                    {
                        listadoSistemas &&
                        listadoSistemas.map(sistema => (
                            <div key={sistema.idSistema} className="form-group mt-2">
                                <button
                                    className="btnSubmit btnLogin"
                                    key={sistema.idSistema}
                                    onClick={async (e) => await handleButtonSystem(e, sistema.urlSistema, sistema.idSistema)}
                                >
                                    {sistema.nombreSistema}
                                </button>
                            </div>
                        ))
                    }
                    <a href="#"><p className="textClave mt-4 mb-2" onClick={handleBack} >Regresar</p></a>
                </div>
            </div>
        </div>


    )
}
