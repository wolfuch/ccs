import React from 'react';
import logoRednegocios from '../assets/icons/logo-rednegocios.png';
import { FormLogin } from '../components/FormLogin';
import { ItemFooter } from '../components/ItemFooter';

const Login = () => {
  const handleLogin = (token) => {
    console.log('Login successful, token:', token);
    // Aquí puedes manejar el token, por ejemplo guardarlo en el estado global, sessionStorage, etc.
  };

  return (
    <>
      <section className="section--login">
        <div className="section__bg">
          <div className="bg bg--login"></div>
        </div>
        <div className="section__wrap">
          <div className="section__body">
            <div className="section__form">
              <div className="section__icon">
                <img src={logoRednegocios} alt="Logo" />
              </div>
              <FormLogin onLogin={handleLogin} />
            </div>
          </div>
        </div>
      </section>
      <ItemFooter />
    </>
  );
};

export default Login;
