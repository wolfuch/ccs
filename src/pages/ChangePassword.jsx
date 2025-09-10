import React from 'react';
import logoRednegocios from '../assets/icons/logo-rednegocios.png';
import { FormChangePass } from '../components/FormChangePass';
import { ItemFooter } from '../components/ItemFooter';

const ChangePassword = () => {
  return (
    <>
      <section className="section--login">
        <div className="section__bg">
          <div className="bg bg--changepass"></div>
        </div>
        <div className="section__wrap">
          <div className="section__body">
            <div className="section__form">
              <div className="section__icon">
                <img src={logoRednegocios} alt="Logo" />
              </div>
              <FormChangePass />
            </div>
          </div>
        </div>
      </section>
      <ItemFooter />
    </>
  );
};

export default ChangePassword;
