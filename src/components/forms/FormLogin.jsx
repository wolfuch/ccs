import React, { useState } from 'react';
import { login, registraIngreso, renew, ObtenerNuevoToken } from '../../services/authService';
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { validateEmail } from '../../utils/email';
import { resolveAuthenticationOutcome } from '../../helpers/authenticationOutcome';
import { useTranslation } from "react-i18next";
import { useFieldErrors } from '../../hooks/useFieldErrors';
import { FormField } from '../ui/FormField';
import { PasswordInput } from '../ui/PasswordInput';

// ProtectedRoute solo deja entrar a /reset-password y /change-password si este flag existe
const markInternalNavigation = (loading) => (e) => {
  if (loading) {
    e.preventDefault();
    return;
  }
  sessionStorage.setItem('internalNavigation', 'true');
};

export function FormLogin() {
  const APP_URL_PROVEEDOR = import.meta.env.VITE_APP_URL_PROVEEDOR;
  const APP_URL_MANDANTE = import.meta.env.VITE_APP_URL_MANDANTE;
  const APP_URL_BACKOFFICE = import.meta.env.VITE_APP_URL_BACKOFFICE

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fieldErrors, setFieldErrors, clearFieldError } = useFieldErrors({
    email: false,
    password: false
  });
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sistemas, setSistemas] = useState([]);
  const [tokenLogin, setTokenLogin] = useState('');
  const [idUsuarioLogeado, setIdUsuarioLogeado] = useState(0);
  const [tokenPaso, setTokenPaso] = useState()
  const { t } = useTranslation();

  const processLoginResponse = async (authResponse) => {
    const { success, resultado, errores } = authResponse;
    if (success !== 'OK') {
      if (!!errores && errores.length > 0 && !!errores[0].descripcion) {
        setDialogMessage(errores[0].descripcion);
        setShowDialog(true);
        return;
      }
      throw new Error('Login failed');
    }

    const outcome = resolveAuthenticationOutcome(resultado);

    switch (outcome.kind) {
      case 'authenticated': {
        const { token, userIdentifier, listadoSistemas } = outcome;
        setTokenPaso(token);

        if (listadoSistemas.length === 1) {
          const valor = await newToken(token, listadoSistemas[0].idSistema);
          await registrarIngresoYRedirigir(listadoSistemas[0], valor, userIdentifier);
          return;
        }

        setSistemas(listadoSistemas);
        setIdUsuarioLogeado(userIdentifier);
        return;
      }
      case 'passwordChangeRequired': {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('internalNavigation', 'true');
        window.location.href = '/change-password';
        return;
      }
      case 'noSystemsAvailable': {
        setDialogMessage(t("sinSistemasDisponibles"));
        setShowDialog(true);
        return;
      }
      case 'invalidCredentials': {
        setDialogMessage(t("errorIniciarSesion"));
        setShowDialog(true);
        return;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      email: email.trim() === '',
      password: password.trim() === ''
    };

    setFieldErrors(errors);

    const isEmailValid = validateEmail(email, setEmailFormatError);

    if (errors.email || errors.password || !isEmailValid) {
      return;
    }

    setLoading(true);
    try {
      const authResponse = await login(email, password);
      await processLoginResponse(authResponse);
    } catch (err) {
      setDialogMessage(t("errorIniciarSesion"));
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const newToken = async(token,sistema)=> {  
    const resp = await ObtenerNuevoToken(token,sistema);
    sessionStorage.setItem('t', resp);
    return resp;
  }

  const handleSistemaSelect = async (token,sistema) => {
    const valor = await newToken(token, sistema.idSistema)
    await registrarIngresoYRedirigir(sistema, valor, idUsuarioLogeado);
  };

  const handleBack = () => {
    setSistemas([]);
    setIdUsuarioLogeado(0);
    setTokenPaso('');
    setEmail('');
    setPassword('');
  };
  
  const registrarIngresoYRedirigir = async (sistema, token, idUsuario) => {
    await registraIngreso(sistema.idSistema, idUsuario);
    const result = await renew(token);
    if (result.success !== 'OK') {
      setDialogMessage(result?.errores?.[0]?.descripcion || t("errorRenovarToken"));
      setShowDialog(true);
      return;
    }
    if (sistema.nombreSistema === 'Mandante')
      window.location.href = `${APP_URL_MANDANTE}/usuario/login?t=${token}`;
    else if (sistema.nombreSistema === 'BackOffice')
      window.location.href = `${APP_URL_BACKOFFICE}/usuario/login?t=${token}`;
    else
      window.location.href = `${APP_URL_PROVEEDOR}/usuario/login?t=${token}`;
  };

  return (
    <>
      <Dialog visible={showDialog} footer={<button className='button' data-testid="form-login-dialog-accept" onClick={() => setShowDialog(false)}>{t("entendido")}</button>} onHide={() => setShowDialog(false)}>
        <p data-testid="form-login-dialog-message">{dialogMessage}</p>
      </Dialog>
      {loading && <div className="loading-overlay" data-testid="form-login-loading"><ProgressSpinner /></div>}

      {sistemas.length > 1 ? (
        <div className="sistema-selector" data-testid="form-login-system-selector">
          <h3>{t("seleccioneSistema")}:</h3>
          <div className="form__buttons">
            {sistemas.map((sistema) => (
              <button
                key={sistema.idSistema}
                className="button button--outline"
                data-testid={`form-login-system-option-${sistema.idSistema}`}
                onClick={() => handleSistemaSelect(tokenPaso, sistema)}
              >
                {sistema.nombreSistema}
                <span className="pi pi-arrow-right"></span>
              </button>
            ))}
          </div>
          <div className="form__buttons">
            <button className="button" data-testid="form-login-system-back" onClick={handleBack}>
              {t("volverAtras")}
            </button>
          </div>
        </div>
      ) : (
        <form className="form" data-testid="form-login" onSubmit={handleSubmit} autoComplete='off' noValidate>
          <div className='form__header'>
            <h2>{t("iniciarSesion")}</h2>
            <p>{t("ingreseEmailPassword")}</p>
          </div>
          <div className='form__body'>
            <FormField
              label="Email"
              htmlFor="login-email"
              testId="form-login-email-field"
              errors={[
                { id: 'required', show: fieldErrors.email, message: t("campoRequerido") },
                { id: 'format', show: emailFormatError, message: t("ingreseEmailValido") },
              ]}
            >
              <div className="form__input">
                <input
                  id="login-email"
                  data-testid="form-login-email"
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
              label={t("password")}
              htmlFor="login-password"
              testId="form-login-password-field"
              errors={[{ id: 'required', show: fieldErrors.password, message: t("campoRequerido") }]}
            >
              <PasswordInput
                id="login-password"
                testId="form-login-password"
                value={password}
                placeholder={t("ingresePassword")}
                onChange={e => {
                  setPassword(e.target.value);
                  clearFieldError('password');
                }}
                disabled={loading}
              />
            </FormField>
            <div className="form__resetpass">
              <Link
                to="/reset-password"
                data-testid="form-login-forgot-password"
                className={loading ? "link-disabled" : ""}
                onClick={markInternalNavigation(loading)}
              >
                {t("olvidoPassword")}
              </Link>
            </div>
            <div className="form__buttons">
              <button type="submit" className="button" data-testid="form-login-submit" disabled={loading}>
                {loading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" /> : t("ingresar")}
              </button>
              <Link
                to="/change-password"
                data-testid="form-login-change-password"
                className={loading ? "button button--outline link-disabled" : "button button--outline"}
                onClick={markInternalNavigation(loading)}
              >
                {t("cambiarClave")}
              </Link>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
