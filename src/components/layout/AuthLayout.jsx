import React from 'react';
import PropTypes from 'prop-types';
import logoCcsRednegocios from '../../assets/logos/logo-ccs-rednegocios.png';
import logoRednegocios from '../../assets/logos/logo-rednegocios.svg';
import { BackgroundCarousel } from './BackgroundCarousel';
import { AuthFooter } from './AuthFooter';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useMediaQuery } from '../../hooks/useMediaQuery';

// Mismo valor que $bp-desktop en src/styles/abstracts/_tokens.sass
const DESKTOP_QUERY = '(min-width: 992px)';

export function AuthLayout({ children }) {
  // En mobile no se monta el carrusel, así no se descarga ninguna foto
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <div className="auth" data-testid="auth-layout">
      {isDesktop && (
        <div className="auth__media" data-testid="auth-layout-media">
          <BackgroundCarousel />
        </div>
      )}
      <div className="auth__panel" data-testid="auth-layout-panel">
        <div className="auth__lang">
          <LanguageSwitcher />
        </div>
        <div className="auth__content">
          <picture className="auth__logo" data-testid="auth-layout-logo">
            <source media={DESKTOP_QUERY} srcSet={logoCcsRednegocios} />
            <img src={logoRednegocios} alt="Cámara de Comercio de Santiago - RedNegocios" />
          </picture>
          {children}
        </div>
        <AuthFooter />
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
