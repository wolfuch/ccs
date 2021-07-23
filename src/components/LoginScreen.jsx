import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { iniciarLogin } from '../actions/auth';

import "./LoginScreen.style.css";
import { useLocation } from 'react-router-dom';

import queryString from 'query-string';

import Footer from './footer/footer.component';

export const LoginScreen = (props) => {
    
    const dispatch = useDispatch();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    //email: testwp@ccs.cl password: 262626
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formLoginValues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( iniciarLogin( email, password, q ) );
    }

    return (
        <body className="jumbotron">
            <div className="container containerprueba login-container">
                <div className="cardAzul p-5" >
                    <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
                        <div className="col-md-12 col-xs-12 col-12 login-form-1">
                            <a><img src={process.env.PUBLIC_URL + '/img/logoFooter.svg'} className="img-fluid logo" alt="Responsive image" ></img></a>
                            <p style={{color:'white',fontSize:'25px',margin:'25px'}}>Ingreso<strong> Usuario</strong></p>
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
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name="password"
                                        value={ password }
                                        onChange={ handleLoginInputChange }
                                        maxLength={8}
                                        minLength={6}
                                        required
                                    />
                                </div>
                                <a href="#"><p className="textClave mt-4 mb-4" >¿Olvido su Clave?</p></a>

                                <div className="form-group">
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
            </div>
            <Footer/>
        </body>
    )
}