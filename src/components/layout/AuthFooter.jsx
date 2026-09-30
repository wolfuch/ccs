import React from 'react';
import { useTranslation } from 'react-i18next';

const CONTACTS = [
  { id: 'address', icon: 'pi-map-marker', label: 'Monjitas #392, Santiago - Chile', href: 'https://maps.app.goo.gl/GYBqw2r93jLhv4di6', external: true },
  { id: 'email', icon: 'pi-envelope', label: 'rednegocios@ccs.cl', href: 'mailto:rednegocios@ccs.cl' },
  { id: 'phone', icon: 'pi-phone', label: '+56 2 2818 5706', href: 'tel:+56228185706' },
];

export function AuthFooter() {
  const { t } = useTranslation();

  return (
    <footer className="auth__footer" data-testid="auth-footer">
      <ul className="auth__contact">
        {CONTACTS.map(contact => (
          <li key={contact.id}>
            <a
              href={contact.href}
              data-testid={`auth-footer-contact-${contact.id}`}
              {...(contact.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <span className={`pi ${contact.icon}`} aria-hidden="true"></span>
              {contact.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="auth__legal">
        © {new Date().getFullYear()} - RED NEGOCIOS CCS {t('derechosReservados')} ·{' '}
        <a href="https://www.rednegocios.cl/terminos-condiciones/" data-testid="auth-footer-terms" target="_blank" rel="noopener noreferrer">
          {t('terminosCondiciones')}
        </a>
      </p>
    </footer>
  );
}
