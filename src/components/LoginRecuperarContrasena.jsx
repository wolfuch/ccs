import React from 'react'
import { useDispatch } from 'react-redux';
import { restablecerContrasena } from '../actions/auth';
import { showLogin } from '../actions/ui';
import { useForm } from '../hooks/useForm';

export const LoginRecuperarContrasena = () => {
    
    const dispatch = useDispatch();
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        email: ''        
    });

    const { email } = formLoginValues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        
        dispatch( restablecerContrasena( email ) );
    }

    const handleBack = ( e ) => {
        e.preventDefault();

        dispatch( showLogin() );
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

                                <a href="#"><p className="textClave mt-4 mb-4" onClick={ handleBack } >Regresar</p></a>

                                <div className="form-group">
                                    <input 
                                        type="submit"
                                        className="btnSubmit btnLogin"
                                        value="REESTABLECER" 
                                    />
                                </div>
                            </form> 
            </div>
        </div>
    </div>

         
    )
}