import React, { useRef, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { login, registraIngreso, renew, ObtenerNuevoToken, LoginCaptchaV2 } from '../services/authService';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {validateEmail} from '../utils/email';
import { useTranslation } from "react-i18next"; 
import CaptchaChallenges from "./../components/general/captchaChallenges"

export function FormLogin({ onLogin }) {
  const APP_URL_PROVEEDOR = import.meta.env.VITE_APP_URL_PROVEEDOR;
  const APP_URL_MANDANTE = import.meta.env.VITE_APP_URL_MANDANTE;
  const APP_URL_BACKOFFICE = import.meta.env.VITE_APP_URL_BACKOFFICE

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
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
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showV2, setShowV2] = useState(false);
  const captchaV2Ref = useRef(null);

  const clearFieldError = (fieldName) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: false }));
    }
  };

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

    if (resultado?.requireCaptcha === true) {
      setDialogMessage(t("requiereCaptcha"));
      setShowDialog(true);
      captchaV2Ref.current?.reset();
      setShowV2(true);
      return;
    }

    // Obligar cambio contraseña si es necesario
    if (resultado?.contrasenaValidada === false) {
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('internalNavigation', 'true');
      window.location.href = '/change-password';
      return;
    }

    const { token, idUsuario, listadoSistemas } = resultado;
    setTokenPaso(token);

    if (listadoSistemas.length === 1) {
      const valor = await newToken(token, listadoSistemas[0].idSistema);
      await registrarIngresoYRedirigir(listadoSistemas[0], valor, idUsuario);
      onLogin(valor);
      return;
    }
    if (listadoSistemas.length > 1) {
      setSistemas(listadoSistemas);
      setIdUsuarioLogeado(idUsuario);
      return;
    }
    setDialogMessage(t("sinSistemasDisponibles"));
    setShowDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos requeridos
    const errors = {
      email: email.trim() === '',
      password: password.trim() === ''
    };

    setFieldErrors(errors);

    // Validar formato de email
    const isEmailValid = validateEmail(email, setEmailFormatError);

    // Si hay errores, no continuar
    if (errors.email || errors.password || !isEmailValid) {
      return;
    }

    if (!executeRecaptcha) {
      setDialogMessage(t("errorRecaptcha"));
      setShowDialog(true);
      return;
    }

    const recaptchaToken = await executeRecaptcha('login');

    setLoading(true);
    try {
      const authResponse = await login(email, password, recaptchaToken);
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
    onLogin(valor);
  };

  const handleBack = () => {
    setSistemas([]);
    setIdUsuarioLogeado(0);
    setTokenPaso('');
    // setTokenLogin('');
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
    // console.log('sistema.nombreSistema', sistema.nombreSistema)
    if (sistema.nombreSistema === 'Mandante')
      window.location.href = `${APP_URL_MANDANTE}/usuario/login?t=${token}`;
    else if (sistema.nombreSistema === 'BackOffice')
      window.location.href = `${APP_URL_BACKOFFICE}/usuario/login?t=${token}`;
    else
      window.location.href = `${APP_URL_PROVEEDOR}/usuario/login?t=${token}`;
  };

  const handleV2Success = async (tokenV2) => {
    setLoading(true);
    setShowV2(false);
    try {
      const authResponse = await login(email, password, '', tokenV2);
      await processLoginResponse(authResponse);
    } catch (error) {
      setDialogMessage(t("errorCaptchaV2"));
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog visible={showDialog} footer={<a className='button' onClick={() => setShowDialog(false)}>Entendido</a>} onHide={() => setShowDialog(false)}>
        <p>{dialogMessage}</p>
      </Dialog>
      {loading && <div className="loading-overlay"><ProgressSpinner /></div>}

      {sistemas.length > 1 ? (
        <div className="sistema-selector">
          <h3>{t("seleccioneSistema")}:</h3>
          <div className="form__buttons">
            {sistemas.map((sistema) => (
              <button
                key={sistema.idSistema}
                className="button button--white"
                onClick={() => handleSistemaSelect(tokenPaso, sistema)}
              >
                {sistema.nombreSistema}
                <span className="pi pi-arrow-right"></span>
              </button>
            ))}
          </div>
          <div className="form__buttons">
            <button className="button" onClick={handleBack}>
              {t("volverAtras")}
            </button>
          </div>
        </div>
      ) : (
        <>
          <form className="form" onSubmit={handleSubmit} autoComplete='off'>
            <div className='form__header'>
              <h2>{t("iniciarSesion")}</h2>
              <p>{t("ingreseEmailPassword")}</p>
            </div>
            <div className='form__body'>
              <div className="form__element">
                <div className="form__title">Email</div>
                <div className="form__input">
                  <input
                    type="text"
                    value={email}
                    placeholder={t("ingreseEmail")}
                    onChange={e => {
                      setEmail(e.target.value);
                      clearFieldError('email');
                      validateEmail(e.target.value, setEmailFormatError);
                    }}
                    disabled={loading || showV2}
                  />
                </div>
                {fieldErrors.email && (
                  <div className="form__field-error">
                    <span className="pi pi-times"></span>
                    {t("campoRequerido")}
                  </div>
                )}
                {emailFormatError && (
                  <div className="form__field-error">
                    <span className="pi pi-times"></span>
                    {t("ingreseEmailValido")}
                  </div>
                )}
              </div>
              <div className="form__element">
                <div className="form__title">{t("password")}</div>
                <div className="form__input">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder={t("ingresePassword")}
                    onChange={e => {
                      setPassword(e.target.value);
                      clearFieldError('password');
                    }}
                    disabled={loading || showV2}
                  />
                  <span 
                    className={`form__toggle-password pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></span>
                </div>
                {fieldErrors.password && (
                  <div className="form__field-error">
                    <span className="pi pi-times"></span>
                    {t("campoRequerido")}
                  </div>
                )}
                <div className="form__resetpass" >
                  <Link 
                    to="/reset-password"
                    className={loading || showV2 ? "link-disabled" : ""}
                    onClick={(e) => {
                      if (loading || showV2) {
                        e.preventDefault(); // Evita la navegación
                        return;
                      }
                      sessionStorage.setItem('internalNavigation', 'true');
                    }}
                  >
                    {t("olvidoPassword")}
                  </Link>
                </div>
              </div>
              <div className="form__buttons">
                <button type="submit" className="button" disabled={loading || showV2}>
                  {loading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" /> : t("ingresar")}
                </button>
                <Link 
                  to="/change-password"
                  className={loading || showV2 ? "button button--white link-disabled" : "button button--white"}
                  onClick={(e) => {
                    if (loading || showV2) {
                      e.preventDefault(); // Evita la navegación
                      return;
                    }
                    sessionStorage.setItem('internalNavigation', 'true');
                  }}
                >
                  {t("cambiarClave")}
                </Link>                
              </div>
            </div>
          </form>

          <CaptchaChallenges ref={captchaV2Ref} show={showV2} handleSuccess={handleV2Success} />
        </>
      )}
    </>
  );
}

FormLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
