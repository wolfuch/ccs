import React from 'react'
import { useDispatch } from 'react-redux';
import { cambiarContrasena } from '../actions/auth';
import { useForm } from '../hooks/useForm';
import Swal from 'sweetalert2';
import { showLogin } from '../actions/ui';

export const LoginCambiaContrasena = (url = '') => {
    
    const dispatch = useDispatch();
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        email: '',
        contrasenaActual: '',
        contrasenaNueva: '',
        passwordRepite: ''       
    });

    const { email, contrasenaActual, contrasenaNueva, contrasenaRepite } = formLoginValues;

    const handleLogin = ( e ) => {
        e.preventDefault();

        if (contrasenaNueva !== contrasenaRepite){
            Swal.fire({
                title: "Reestablecer Contraseña.",
                icon: "info",
                text: 'La contraseña que esta ingresando no es igual al repetir contraseña.',
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#083c70",
                width: "40%",
                padding: "2rem",
                buttonsStyling: "false"
            });

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
                <p style={{color:'white',fontSize:'25px',margin:'25px'}}>Ingreso<strong> Usuario</strong></p>
                <p style ={{color:'white'}}>Ingrese el Usuario que se desea reestablecer.</p>
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

                                <div className="form-group mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña Actual"
                                        name="contrasenaActual"
                                        value={ contrasenaActual }
                                        onChange={ handleLoginInputChange }
                                        maxLength={8}
                                        minLength={6}
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña Nueva"
                                        name="contrasenaNueva"
                                        value={ contrasenaNueva }
                                        onChange={ handleLoginInputChange }
                                        maxLength={8}
                                        minLength={6}
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Repetir Contraseña"
                                        name="contrasenaRepite"
                                        value={ contrasenaRepite }
                                        onChange={ handleLoginInputChange }
                                        maxLength={8}
                                        minLength={6}
                                        required
                                        autoComplete="off"
                                    />
                                </div>

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