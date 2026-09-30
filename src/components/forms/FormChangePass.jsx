import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changePassword } from '../../services/changepassService';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { validateEmail } from '../../utils/email';
import { useTranslation } from "react-i18next";
import { useFieldErrors } from '../../hooks/useFieldErrors';
import { FormField } from '../ui/FormField';
import { PasswordInput } from '../ui/PasswordInput';

export function FormChangePass() {
  const [email, setEmail] = useState(sessionStorage.getItem('email') || "");
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [contrasenaNuevaRepeat, setContrasenaNuevaRepeat] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumbers: false,
    hasSpecialChar: false,
    noSpaces: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { fieldErrors, setFieldErrors, clearFieldError } = useFieldErrors({
    email: false,
    contrasenaActual: false,
    contrasenaNueva: false,
    contrasenaNuevaRepeat: false
  });
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [returnToLogin, setReturnToLogin] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    sessionStorage.removeItem('email'); // Limpiar email al cargar el componente
  }, []);

  const validatePassword = (password) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      noSpaces: !/\s/.test(password) // No permite espacios en blanco
    });
  };

  const passwordRules = [
    { id: 'min-length', valid: passwordValidation.minLength, label: t("passwordMinimoCaracteres") },
    { id: 'lowercase', valid: passwordValidation.hasLowercase, label: t("passwordMinimoMinusculas") },
    { id: 'uppercase', valid: passwordValidation.hasUppercase, label: t("passwordMinimoMayusculas") },
    { id: 'number', valid: passwordValidation.hasNumbers, label: t("passwordMinimoNumeros") },
    { id: 'special-char', valid: passwordValidation.hasSpecialChar && passwordValidation.noSpaces, label: t("passwordMinimoCaracteresEspeciales") },
  ];

  const validatePasswordsMatch = (newPassword, repeatPassword) => {
    setPasswordsMatch(newPassword === repeatPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos requeridos
    const errors = {
      email: email.trim() === '',
      contrasenaActual: contrasenaActual.trim() === '',
      contrasenaNueva: contrasenaNueva.trim() === '',
      contrasenaNuevaRepeat: contrasenaNuevaRepeat.trim() === ''
    };

    setFieldErrors(errors);

    // Validar formato de email
    const isEmailValid = validateEmail(email, setEmailFormatError);

    // Si hay errores, no continuar
    if (errors.email || errors.contrasenaActual || errors.contrasenaNueva || errors.contrasenaNuevaRepeat || !isEmailValid) {
      return;
    }

    if (Object.values(passwordValidation).some(valid => valid === false))
      return;

    if (contrasenaNueva !== contrasenaNuevaRepeat) {
      setMessage(t("passwordsNoCoinciden"));
      setShowDialog(true);
      return;
    }
    setLoading(true);
    try {
      const response = await changePassword(email, contrasenaActual, contrasenaNueva);
      if (response.success !== 'OK')
        setMessage(response?.errores?.[0]?.descripcion || t("errorCambiarPassword"));
      else {
        setMessage(t("passwordActualizada"));
        setReturnToLogin(true);
      }
      setShowDialog(true);
    } catch (err) {
      setMessage(`${t("errorCambiarPassword")}. ${t("intenteMasTarde")}`);
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog visible={showDialog} footer={<button className='button' data-testid="form-change-pass-dialog-accept" onClick={() => {
        setShowDialog(false)
        if (returnToLogin) {
          window.location.href = '/login';
        }
      }}>{t("entendido")}</button>} onHide={() => setShowDialog(false)}>
        <p data-testid="form-change-pass-dialog-message">{message}</p>
      </Dialog>
      {loading && <div className="loading-overlay" data-testid="form-change-pass-loading"><ProgressSpinner /></div>}
      <form className="form" data-testid="form-change-pass" onSubmit={handleSubmit} noValidate>
        <div className='form__header'>
          <h2>{t("cambiarPassword")}</h2>
          <p>{t("completeCambiarPassword")}</p>
        </div>
        <div className='form__body'>
          <FormField
            label="Email"
            htmlFor="change-email"
            testId="form-change-pass-email-field"
            errors={[
              { id: 'required', show: fieldErrors.email, message: t("campoRequerido") },
              { id: 'format', show: emailFormatError, message: t("ingreseEmailValido") },
            ]}
          >
            <div className="form__input">
              <input
                id="change-email"
                data-testid="form-change-pass-email"
                type="email"
                value={email}
                placeholder={t("ingreseEmail")}
                onChange={e => {
                  setEmail(e.target.value);
                  clearFieldError('email');
                  validateEmail(e.target.value, setEmailFormatError);
                }}
                disabled={loading}
              />
            </div>
          </FormField>

          <FormField
            label={t("passwordActual")}
            htmlFor="change-current-password"
            testId="form-change-pass-current-password-field"
            errors={[{ id: 'required', show: fieldErrors.contrasenaActual, message: t("campoRequerido") }]}
          >
            <PasswordInput
              id="change-current-password"
              testId="form-change-pass-current-password"
              value={contrasenaActual}
              placeholder={t("ingresePasswordActual")}
              onChange={e => {
                setContrasenaActual(e.target.value);
                clearFieldError('contrasenaActual');
              }}
              disabled={loading}
            />
          </FormField>

          <FormField label={t("passwordNueva")} htmlFor="change-new-password" testId="form-change-pass-new-password-field">
            <PasswordInput
              id="change-new-password"
              testId="form-change-pass-new-password"
              value={contrasenaNueva}
              placeholder={t("ingresePasswordNueva")}
              onChange={e => {
                setContrasenaNueva(e.target.value);
                validatePassword(e.target.value);
                validatePasswordsMatch(e.target.value, contrasenaNuevaRepeat);
                clearFieldError('contrasenaNueva');
              }}
              disabled={loading}
            />
            <div className="form__password-validation" data-testid="form-change-pass-rules">
              {passwordRules.map(rule => (
                <div key={rule.id} className={`validation-item ${rule.valid ? 'valid' : 'invalid'}`} data-testid={`form-change-pass-rule-${rule.id}`} data-valid={rule.valid}>
                  <span className={`pi ${rule.valid ? 'pi-check' : 'pi-times'}`}></span>
                  {rule.label}
                </div>
              ))}
            </div>
          </FormField>

          <FormField
            label={t("repetirNuevaPassword")}
            htmlFor="change-repeat-password"
            testId="form-change-pass-repeat-password-field"
            errors={[
              { id: 'required', show: fieldErrors.contrasenaNuevaRepeat, message: t("campoRequerido") },
              {
                id: 'mismatch',
                show: !passwordsMatch && contrasenaNuevaRepeat.length > 0,
                message: t("passwordsNoCoinciden2"),
                className: 'form__password-error',
              },
            ]}
          >
            <PasswordInput
              id="change-repeat-password"
              testId="form-change-pass-repeat-password"
              value={contrasenaNuevaRepeat}
              placeholder={t("repitaPasswordNueva")}
              onChange={e => {
                setContrasenaNuevaRepeat(e.target.value);
                validatePasswordsMatch(contrasenaNueva, e.target.value);
                clearFieldError('contrasenaNuevaRepeat');
              }}
              disabled={loading}
            />
          </FormField>

          <div className="form__buttons">
            <button type="submit" className="button" data-testid="form-change-pass-submit" disabled={loading}>
              {loading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" /> : t("cambiar")}
            </button>
            <Link to="/login" className="button button--outline" data-testid="form-change-pass-back-login">{t("irInicioSesion")}</Link>
          </div>
        </div>
      </form>
    </>
  );
}
