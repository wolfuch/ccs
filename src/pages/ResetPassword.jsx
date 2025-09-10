import React from 'react';
import logoRednegocios from '../assets/icons/logo-rednegocios.png';
import { FormResetPass } from '../components/FormResetPass';
import { ItemFooter } from '../components/ItemFooter';

const ResetPassword = () => {
  return (
    <>
      <section className="section--login">
        <div className="section__bg">
          <div className="bg bg--resetpass"></div>
        </div>
        <div className="section__wrap">
          <div className="section__body">
            <div className="section__form">
              <div className="section__icon">
                <img src={logoRednegocios} alt="Logo" />
              </div>
              <FormResetPass />
            </div>
          </div>
        </div>
      </section>
      <ItemFooter />
    </>
  );
};

export default ResetPassword;
