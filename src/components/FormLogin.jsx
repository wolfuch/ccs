import React, { useState } from 'react';
import { login, registraIngreso, renew } from '../services/authService';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {validateEmail} from '../utils/email';

export function FormLogin({ onLogin }) {
  const APP_URL_PROVEEDOR = import.meta.env.VITE_APP_URL_PROVEEDOR;
  const APP_URL_MANDANTE = import.meta.env.VITE_APP_URL_MANDANTE;

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

  const clearFieldError = (fieldName) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: false }));
    }
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
    
    setLoading(true);
    try {
      const authResponse = await login(email, password);
      const { success, resultado, errores } = authResponse;
      if (success !== 'OK') {
        if (!!errores && errores.length > 0 && !!errores[0].descripcion) {
          setDialogMessage(errores[0].descripcion);
          setShowDialog(true);
          return;
        }
        throw new Error('Login failed');
      }

      // Obligar cambio contraseña si es necesario
      if(resultado?.contrasenaValidada === false) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('internalNavigation', 'true');
        window.location.href = '/change-password';
        return;
      }

      const { token, idUsuario, listadoSistemas } = resultado;
      onLogin(token);
      if (listadoSistemas.length === 1) {
        await registrarIngresoYRedirigir(listadoSistemas[0], token, idUsuario);
        return;
      }
      if (listadoSistemas.length > 1) {
        setSistemas(listadoSistemas);
        setTokenLogin(token);
        setIdUsuarioLogeado(idUsuario);
        return;
      }
      setDialogMessage('No tienes sistemas disponibles.');
      setShowDialog(true);
    } catch (err) {
      setDialogMessage('Error al iniciar sesión. Verifique sus credenciales y vuelva a intentarlo.');
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSistemaSelect = async (sistema) => {
    console.log('Selected system:', sistema);
    await registrarIngresoYRedirigir(sistema, tokenLogin, idUsuarioLogeado);
  };

  const handleBack = () => {
    setSistemas([]);
    setIdUsuarioLogeado(0);
    setTokenLogin('');
    setEmail('');
    setPassword('');
  };

  const registrarIngresoYRedirigir = async (sistema, token, idUsuario) => {
    await registraIngreso(sistema.idSistema, idUsuario);
    const result = await renew(token);
    if (result.success !== 'OK') {
      setDialogMessage(result?.errores?.[0]?.descripcion || 'Error al renovar el token de sesión.');
      setShowDialog(true);
      return;
    }

    if (sistema.nombreSistema === 'Mandante')
      window.location.href = `${APP_URL_MANDANTE}/usuario/login?t=${token}`;
    else
      window.location.href = `${APP_URL_PROVEEDOR}/usuario/login?t=${token}`;
  };

  return (
    <>
      <Dialog visible={showDialog} footer={<a className='button' onClick={() => setShowDialog(false)}>Entendido</a>} onHide={() => setShowDialog(false)}>
        <p>{dialogMessage}</p>
      </Dialog>
      {loading && <div className="loading-overlay"><ProgressSpinner /></div>}

      {sistemas.length > 1 ? (
        <div className="sistema-selector">
          <h3>Seleccione un sistema:</h3>
          <div className="form__buttons">
            {sistemas.map((sistema) => (
              <button
                key={sistema.idSistema}
                className="button button--white"
                onClick={() => handleSistemaSelect(sistema)}
              >
                {sistema.nombreSistema}
                <span className="pi pi-arrow-right"></span>
              </button>
            ))}
          </div>
          <div className="form__buttons">
            <button className="button" onClick={handleBack}>
              Volver atrás
            </button>
          </div>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit} autoComplete='off'>
          <div className='form__header'>
            <h2>Iniciar sesión</h2>
            <p>Ingrese su Email y Contraseña para ingresar a la plataforma de RedNegocios</p>
          </div>
          <div className='form__body'>
            <div className="form__element">
              <div className="form__title">Email</div>
              <div className="form__input">
                <input
                  type="text"
                  value={email}
                  placeholder="Ingrese su Email"
                  onChange={e => {
                    setEmail(e.target.value);
                    clearFieldError('email');
                    validateEmail(e.target.value, setEmailFormatError);
                  }}
                  disabled={loading}
                />
              </div>
              {fieldErrors.email && (
                <div className="form__field-error">
                  <span className="pi pi-times"></span>
                  El campo es requerido
                </div>
              )}
              {emailFormatError && (
                <div className="form__field-error">
                  <span className="pi pi-times"></span>
                  Ingrese un email válido
                </div>
              )}
            </div>
            <div className="form__element">
              <div className="form__title">Contraseña</div>
              <div className="form__input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Ingrese su Contraseña"
                  onChange={e => {
                    setPassword(e.target.value);
                    clearFieldError('password');
                  }}
                  disabled={loading}
                />
                <span 
                  className={`form__toggle-password pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                  onClick={() => setShowPassword(!showPassword)}
                ></span>
              </div>
              {fieldErrors.password && (
                <div className="form__field-error">
                  <span className="pi pi-times"></span>
                  El campo es requerido
                </div>
              )}
              <div className="form__resetpass">
                <Link 
                  to="/reset-password"
                  onClick={() => sessionStorage.setItem('internalNavigation', 'true')}
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div>
            </div>
            <div className="form__buttons">
              <button type="submit" className="button" disabled={loading}>
                {loading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" /> : 'Ingresar'}
              </button>
              <Link 
                to="/change-password" 
                className="button button--white" 
                disabled={loading}
                onClick={() => sessionStorage.setItem('internalNavigation', 'true')}
              >
                Cambiar Clave
              </Link>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

FormLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
