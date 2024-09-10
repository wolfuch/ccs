import React from 'react'
import { useDispatch } from 'react-redux';
import { iniciarLogin } from '../actions/auth';
import { showChangePassword, showRecoveryPassword } from '../actions/ui';
import { useForm } from '../hooks/useForm';
import FormPassword from '../components/form-password/form-password.component'

export const LoginFormInput = (url = '') => {
    
    const dispatch = useDispatch();
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formLoginValues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        
        dispatch( iniciarLogin( email, password, url ) );
    }

    const handlePasswordRecovery = ( e ) => {
        e.preventDefault();
        
        dispatch( showRecoveryPassword() );
    }

    const handleChangePassword = ( e ) => {
        e.preventDefault();
        
        dispatch( showChangePassword() );
    }

    return (
        <div className="cardAzul p-5" >
        <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
            <div className="col-md-12 col-xs-12 col-12 login-form-1">
                <a><img src={process.env.PUBLIC_URL + '/img/logoFooter.svg'} className="img-fluid logo" alt="Responsive" ></img></a>
                <p style={{color:'white',fontSize:'25px',margin:'25px'}}>Ingreso Usuario</p>
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
                                        autoComplete="on"
                                    />
                                </div>
                                <FormPassword placeholder="Contraseña" name="password" value={ password }  handleChange={ handleLoginInputChange } autoComplete="off"/>
                                
                                <a href="#"><p className="textClave mt-4 mb-2" onClick={ handlePasswordRecovery }>¿Olvido su Clave?</p></a>

                                <a href="#"><p className="textClave mt-2 mb-4" onClick={ handleChangePassword }>Cambiar Clave</p></a>

                                <div className="form-group mt-3">
                                    <input 
                                        type="submit"
                                        className="btnSubmit btnLogin"
                                        value="INGRESAR" 
                                    />
                                </div>
                            </form> 
            </div>
        </div>
    </div>

         
    )
}
