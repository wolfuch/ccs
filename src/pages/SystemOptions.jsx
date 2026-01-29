import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoRednegocios from '../assets/icons/logo-rednegocios.png';
import { FormSystemOptions } from '../components/FormSystemOptions';
import { ItemFooter } from '../components/ItemFooter';
import { registraIngreso } from '../services/authService';

const SystemOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sistemas, token, idUsuario } = location.state || {};

  const handleSelectSystem = async (idSistema) => {
    await registraIngreso(idSistema, idUsuario);
    const selectedSistema = sistemas.find(sistema => sistema.idSistema === idSistema);
    if (selectedSistema) {
      // window.location.href = `${selectedSistema.urlSistema}?token=${token}`;
      console.log('Redirección simulada a:', `${selectedSistema.urlSistema}?token=${token}`);
    }
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
              <FormSystemOptions sistemas={sistemas} onSelectSystem={handleSelectSystem} />
            </div>
          </div>
        </div>
      </section>
       {/*<ItemFooter />*/}
    </>
  );
};

export default SystemOptions;
