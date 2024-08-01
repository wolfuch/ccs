import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showLogin } from '../actions/ui';
import { RegistraIngreso } from '../helpers/auditoria';

export const LoginOpcionUsuario = () => {

    const dispatch = useDispatch();

    const { listadoSistemas, token, nombre, idUsuario, email } = useSelector(state => state.auth);

    const handleBack = (e) => {
        e.preventDefault();
        dispatch(showLogin());
    }

    const handleButtonSystem = (e, sistema, idSistema) => {
        e.preventDefault();
        //RegistraLog
        let data = {
            idUsuario: idUsuario ,
            idSistema: idSistema
        } 
        
        RegistraIngreso(data).then(() => {
             window.location.href = `${sistema}?t=${token}&n=${nombre}&uid=${idUsuario}&email=${email}`;
        })
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
                                    onClick={(e) => handleButtonSystem(e, sistema.urlSistema, sistema.idSistema)}
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
