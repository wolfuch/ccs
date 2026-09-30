import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../../services/resetpassService';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { validateEmail } from '../../utils/email';
import { useTranslation } from "react-i18next";
import { useFieldErrors } from '../../hooks/useFieldErrors';
import { FormField } from '../ui/FormField';

export function FormResetPass() {
  const [email, setEmail] = useState("");
  const { fieldErrors, setFieldErrors, clearFieldError } = useFieldErrors({
    email: false
  });
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campo requerido
    const errors = {
      email: email.trim() === ''
    };

    setFieldErrors(errors);

    // Validar formato de email
    const isEmailValid = validateEmail(email, setEmailFormatError);

    // Si hay errores, no continuar
    if (errors.email || !isEmailValid) {
      return;
    }

    setLoading(true);
    try {
      const response = await requestPasswordReset(email);
      if (response.success !== 'OK')
        setMessage(response?.errores?.[0]?.descripcion || `${t("errorCambioPassword")}. ${t("intenteMasTarde")}`);
      else {
        setMessage(t("reseteoPasswordOk"));
      }
      setShowDialog(true);
    } catch (err) {
      setMessage(`${t("errorCambioPassword")}. ${t("intenteMasTarde")}`);
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog visible={showDialog} footer={<button className='button' data-testid="form-reset-pass-dialog-accept" onClick={() => setShowDialog(false)}>{t("entendido")}</button>} onHide={() => setShowDialog(false)}>
        <p data-testid="form-reset-pass-dialog-message">{message}</p>
      </Dialog>
      {loading && <div className="loading-overlay" data-testid="form-reset-pass-loading"><ProgressSpinner /></div>}
      <form className="form" data-testid="form-reset-pass" autoComplete='off' onSubmit={handleSubmit} noValidate>
        <div className="form__header">
          <h2>{t("restaurarPassword")}</h2>
          <p>{t("ingreseEmailCambiarPassword")}:</p>
        </div>
        <div className="form__body">
          <FormField
            label="Email"
            htmlFor="reset-email"
            testId="form-reset-pass-email-field"
            errors={[
              { id: 'required', show: fieldErrors.email, message: t("campoRequerido") },
              { id: 'format', show: emailFormatError, message: t("ingreseEmailValido") },
            ]}
          >
            <div className="form__input">
              <input
                id="reset-email"
                data-testid="form-reset-pass-email"
                type="email"
                value={email}
                placeholder={t("ingreseEmail")}
                autoComplete='off'
                onChange={e => {
                  setEmail(e.target.value);
                  clearFieldError('email');
                  validateEmail(e.target.value, setEmailFormatError);
                }}
                disabled={loading}
              />
            </div>
          </FormField>
          <div className="form__buttons">
            <button type="submit" className="button" data-testid="form-reset-pass-submit" disabled={loading}>
              {loading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" /> : t("solicitar")}
            </button>
            <Link to="/login" className="button button--outline" data-testid="form-reset-pass-back-login">{t("irInicioSesion")}</Link>
          </div>
        </div>
      </form>
    </>
  );
}
