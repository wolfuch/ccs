import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export function PasswordInput({ id, value, onChange, placeholder, disabled, testId = 'password-input' }) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="form__input form__input--password" data-testid={testId}>
      <input
        id={id}
        data-testid={`${testId}-input`}
        type={visible ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      <button
        type="button"
        data-testid={`${testId}-toggle`}
        className={`form__toggle-password pi ${visible ? 'pi-eye-slash' : 'pi-eye'}`}
        aria-label={visible ? t('ocultarPassword') : t('mostrarPassword')}
        aria-pressed={visible}
        onClick={() => setVisible(prev => !prev)}
      />
    </div>
  );
}

PasswordInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  testId: PropTypes.string,
};
