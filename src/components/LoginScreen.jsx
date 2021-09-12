import React from 'react';

import "./LoginScreen.style.css";
import { useLocation } from 'react-router-dom';

import queryString from 'query-string';

import Footer from './footer/footer.component';
import { LoginFormInput } from './LoginFormInput';
import { Loading } from './loading/Loading';
import CryptoJS from 'crypto-js';
import {  useSelector } from 'react-redux';
import { LoginOpcionUsuario } from './LoginOpcionUsuario';

export const LoginScreen = (props) => {
    
    const location = useLocation();
    const { loading } = useSelector( state => state.ui );
    const { paso }  = useSelector( state => state.auth );

    const { q = '' } = queryString.parse(location.search);

    // if(loading)
    //     return  <Loading />
    //email: testwp@ccs.cl password: 262626

    var prueba = "http://desa.rednegocios.cl/usuario/login;1";
    

    var encrypted = CryptoJS.RC4.encrypt(prueba, process.env.REACT_APP_API_DECRYPTPASSPHRASE).toString();

    

    var decrypted = CryptoJS.RC4.decrypt(encrypted, process.env.REACT_APP_API_DECRYPTPASSPHRASE).toString(CryptoJS.enc.Utf8);

    let prueba2 = decrypted.split(';');

    let url = prueba2[0];
    let sistema = prueba2[1];
    
    return (
        <>
        {loading && <Loading />}
        <div className="jumbotron">
            <div className="container containerprueba login-container">
                {paso == 1 && <LoginFormInput url={url}/>}
                {paso == 2 && <LoginOpcionUsuario />}
            </div>
            <Footer/>
        </div>
        </>
    )
}