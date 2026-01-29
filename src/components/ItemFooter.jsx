import React from 'react';
import logoRednegocios from '../assets/icons/logo-rednegocios-white.svg';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useTranslation } from "react-i18next"; 

export function ItemFooter() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer__primary">
                <div className="footer__wrap">
                    <div className="footer__flex">
                        <div className="footer__logo">
                            <img src={logoRednegocios} alt="Logo" />
                        </div>
                        <div className="footer__infos">
                            <div className="footer__info">
                                <a href="https://maps.app.goo.gl/GYBqw2r93jLhv4di6" target="_blank" rel="noopener noreferrer">
                                    Monjitas #392, Santiago - Chile <FaMapMarkerAlt />
                                </a>
                            </div>
                            <div className="footer__info">
                                <a href="mailto:rednegocios@ccs.cl">
                                    rednegocios@ccs.cl <FaEnvelope />
                                </a>
                            </div>
                            <div className="footer__info">
                                <a href="tel:+56228185706">
                                    +56 2 2712 0257 <FaPhone />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__secondary">
                <div className="footer__wrap footer__wrap--xs">
                    <div className="footer__copyright">
                        <p>© 2025 - RED NEGOCIOS CCS {t("derechosReservados")}</p>
                        <a href="https://www.rednegocios.cl/terminos-condiciones/" target="_blank" rel="noopener noreferrer">{t("terminosCondiciones")}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
