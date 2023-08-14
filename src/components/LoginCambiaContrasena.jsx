import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cambiarContrasena } from '../actions/auth';
import { useForm } from '../hooks/useForm';
import { showLogin } from '../actions/ui';
import { MostrarMensaje, MostrarMensajeHTML } from '../helpers/MostrarMensaje';
import FormPassword from './form-password/form-password.component';

export const LoginCambiaContrasena = (url = '') => {
    
    const dispatch = useDispatch();
    const obtener = useSelector( state => state.auth );

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        email: obtener.email,
        contrasenaActual: '',
        contrasenaNueva: '',
        passwordRepite: ''       
    });

    const { email, contrasenaActual, contrasenaNueva, contrasenaRepite } = formLoginValues;

    const handleLogin = ( e ) => {
        e.preventDefault();

        if (contrasenaNueva !== contrasenaRepite){
            MostrarMensaje('Cambiar Contraseña.', 'La contraseña que esta ingresando no es igual al repetir contraseña.', 'info')
            
            return
        }

        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!¡%*¿?&#-/_^;:=<>{}"|`~])[A-Za-z\d@$!¡%*¿?&#-/_^;:=<>{}"|`~]{8,}$/.test(contrasenaNueva))) {
            MostrarMensajeHTML('Cambiar Contraseña', `<p>La contraseña ingresada no cumple los requsitos de seguridad:</p> 
            <li>Largo Mayor a 8 Caracteres.</li>
            <li>Incluir mayusculas.</li>
            <li>Incluir minusculas.</li>
            <li>Incluir digitos.</li>
            <li>Un caracter especial o simbolo.</li>
        `,'info')
            
            return;
        }

        dispatch( cambiarContrasena( email , contrasenaActual, contrasenaNueva, url ) );
    }

    const handleBack = ( e ) => {
        e.preventDefault();


        dispatch(showLogin());
    }

    return (
        
        <div className="cardAzul p-5" >
        <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
            <div className="col-md-12 col-xs-12 col-12 login-form-1">
                <a><img src={process.env.PUBLIC_URL + '/img/logoFooter.svg'} className="img-fluid logo" alt="Responsive image" ></img></a>
                <p style={{color:'white',fontSize:'25px',margin:'25px'}}>Ingreso Usuario</p>
                <p style ={{color:'white'}}>Ingrese email y contraseña del usuario:</p>
            </div>
            <div className="col-md-8">
            <form onSubmit={ handleLogin }>
                                <div className="form-group mb-4">
                                    <input 
                                        type="email"
                                        className="form-control"
                                        //className={"form-control " + (rutvalido ? "" : "is-invalid")}
                                        placeholder="Usuario"
                                        name="email"
                                        value={ email }
                                        onChange={ handleLoginInputChange }
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                    
                                    <div className='mb-4'></div>
                                    <FormPassword placeholder="Contraseña Actual" name="contrasenaActual" value={ contrasenaActual }  handleChange={ handleLoginInputChange } autoComplete="off"/>
                                    <div className='mb-4'></div>
                                    <FormPassword placeholder="Contraseña Nueva" name="contrasenaNueva" value={ contrasenaNueva }  handleChange={ handleLoginInputChange } autoComplete="off"/>
                                    <div className='mb-4'></div>
                                    <FormPassword placeholder="Repetir Contraseña" name="contrasenaRepite" value={ contrasenaRepite }  handleChange={ handleLoginInputChange } autoComplete="off"/>


                                <a href="#"><p className="textClave mt-4 mb-4" onClick={ handleBack } >Regresar</p></a>

                                <div className="form-group">
                                    <input 
                                        type="submit"
                                        className="btnSubmit btnLogin"
                                        value="CAMBIAR" 
                                    />
                                </div>
                            </form> 
            </div>
        </div>
    </div>

         
    )
}