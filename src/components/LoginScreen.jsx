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
import { LoginRecuperarContrasena } from './LoginRecuperarContrasena';
import { LoginCambiaContrasena } from './LoginCambiaContrasena';

export const LoginScreen = () => {
    
    const location = useLocation();
    const { loading, paso } = useSelector( state => state.ui );
    // const {  }  = useSelector( state => state.auth );

    const { q = '' } = queryString.parse(location.search);

    //console.log(idSistema);
    // var wuea;


           



    // try{

    //     if (q != ''){
    //         wuea = queryString.extract(location.search).substring(2);
    //     }

    //     wuea = CryptoJS.AES.decrypt(wuea, process.env.REACT_APP_API_DECRYPTPASSPHRASE).toString(CryptoJS.enc.Utf8);
    // }catch(e){
    //     console.log('error', e);        
    // }


    



    //  const { q = '' } = queryString.parse(location.search);

    // console.log(`aaaa`, q)


    // console.log(`aplaplac`, aplaplac)
    
    
    // if(loading)
    //     return  <Loading />
    //email: testwp@ccs.cl password: 262626
//U2FsdGVkX18keKSzqBSoegXgTT/QWNmCSAa7TCpa5EFbqZ9M12sUL9nVDYFlDGmzjjZhRtW4RRnGAxXHdmcN40q7Xz891XjIWj5sAg6I0rZFcgxAzcYr0wSfvEpTRxTfJUtMQ0MpJJ+7GQGjrXCZUyH/5CAEWSDBtkX+7y3VM1Y=
    // var pico = {
    //     url: "http://desa.rednegocios.cl/usuario/login",
    //     recuperaContrasena:1,
    //     email:"rodrigo.borlone@gmail.com"
    // }


    // var demo1 = CryptoJS.AES.encrypt(JSON.stringify(pico), process.env.REACT_APP_API_DECRYPTPASSPHRASE).toString();

    
    // console.log(demo1);


    // var demo2 = CryptoJS.AES.decrypt(demo1, process.env.REACT_APP_API_DECRYPTPASSPHRASE).toString(CryptoJS.enc.Utf8);

    // demo2 = JSON.parse(demo2);

    // console.log(demo1);

    //const { url = '', recuperacionContrase = 0, email = '' } = JSON.parse(wuea);

    //console.log(`url`, url)

    // var prueba = "http://desa.rednegocios.cl/usuario/login;1";
  
    // let url = prueba2[0];
    // let sistema = prueba2[1];
    
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