import React from 'react';

import "./LoginScreen.style.css";
import { useLocation, useHistory } from 'react-router-dom';

import queryString from 'query-string';

import Footer from './footer/footer.component';
import { LoginFormInput } from './LoginFormInput';
import { Loading } from './loading/Loading';
// import CryptoJS from 'crypto-js';
import {  useSelector } from 'react-redux';
import { LoginOpcionUsuario } from './LoginOpcionUsuario';
import { LoginRecuperarContrasena } from './LoginRecuperarContrasena';
import { LoginCambiaContrasena } from './LoginCambiaContrasena';

export const LoginScreen = () => {
    
    const location = useLocation();
    const history = useHistory();
    const { loading, paso } = useSelector( state => state.ui );
    // const {  }  = useSelector( state => state.auth );

    const { q = '' } = queryString.parse(location.search);

    if (q !== '') {
        const validUrl = 'rednegocios.cl';
        if (!q.toLowerCase().includes(validUrl.toLowerCase())) {
            history.push("/");
        }
    }
    
    return (
        <>
        {loading && <Loading />}
        <div className="jumbotron">
            <div className="container containerprueba login-container">
                
                {paso === 1 && <LoginFormInput url={q} />}
                
                {paso === 2 && <LoginRecuperarContrasena />}

                {paso === 3 && <LoginCambiaContrasena url={q} />}

                {paso === 4 && <LoginOpcionUsuario />}
            </div>
            <Footer/>
        </div>
        </>
    )
}