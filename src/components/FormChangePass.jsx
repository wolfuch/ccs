import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changePassword } from '../services/changepassService';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { validateEmail } from '../utils/email';

export function FormChangePass() {
  const [email, setEmail] = useState(sessionStorage.getItem('email') || "");
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [contrasenaNuevaRepeat, setContrasenaNuevaRepeat] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumbers: false,
    hasSpecialChar: false,
    noSpaces: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    contrasenaActual: false,
    contrasenaNueva: false,
    contrasenaNuevaRepeat: false
  });
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [showDialog, setShowDialog] = useState(false);
  const [returnToLogin, setReturnToLogin] = useState(false);

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

  const validatePasswordsMatch = (newPassword, repeatPassword) => {
    setPasswordsMatch(newPassword === repeatPassword);
  };

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

    if (passwordValidation.minLength === false ||
      passwordValidation.hasLowercase === false ||
      passwordValidation.hasUppercase === false ||
      passwordValidation.hasNumbers === false ||
      passwordValidation.hasSpecialChar === false ||
      passwordValidation.noSpaces === false)
      return;

    console.log('Submitting form with:', contrasenaNueva, contrasenaNuevaRepeat);
    if (contrasenaNueva !== contrasenaNuevaRepeat) {
      console.log('Passwords do not match');
      setMessage('Las contraseñas nuevas no coinciden.');
      setShowDialog(true);
      return;
    }
    setLoading(true);  // Activar estado de carga
    try {
      const response = await changePassword(email, contrasenaActual, contrasenaNueva);
      if (response.success !== 'OK')
        setMessage(response?.errores?.[0]?.descripcion || 'Error al cambiar la contraseña.');
      else {
        setMessage('Contraseña actualizada con éxito.');
        setReturnToLogin(true);
      }
      setShowDialog(true);
    } catch (err) {
      setMessage('Error al tratar de cambiar la contraseña, intente más tarde.');
      setShowDialog(true);
    } finally {
      setLoading(false);  // Desactivar estado de carga
    }
  };

  return (
    <>
      <Dialog visible={showDialog} footer={<button className='button' onClick={() => {
        setShowDialog(false)
        if (returnToLogin) {
          // Redirigir al login
          window.location.href = '/login';
        }
      }}>Entendido</button>} onHide={() => setShowDialog(false)}>
        <p>{message}</p>
      </Dialog>
      {loading && <div className="loading-overlay"><ProgressSpinner /></div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className='form__header'>
          <h2>Cambiar Contraseña</h2>
          <p>Complete los campos para cambiar su contraseña</p>
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
                disabled={loading}  // Deshabilitar el input mientras carga
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
            <div className="form__title">Contraseña Actual</div>
            <div className="form__input">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={contrasenaActual}
                placeholder="Ingrese su Contraseña Actual"
                onChange={e => {
                  setContrasenaActual(e.target.value);
                  clearFieldError('contrasenaActual');
                }}
                disabled={loading}  // Deshabilitar el input mientras carga
              />
              <span
                className={`form__toggle-password pi ${showCurrentPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              ></span>
            </div>
            {fieldErrors.contrasenaActual && (
              <div className="form__field-error">
                <span className="pi pi-times"></span>
                El campo es requerido
              </div>
            )}
          </div>
          <div className="form__element">
            <div className="form__title">Contraseña Nueva</div>
            <div className="form__input">
              <input
                type={showNewPassword ? "text" : "password"}
                value={contrasenaNueva}
                placeholder="Ingrese su Contraseña Nueva"
                onChange={e => {
                  setContrasenaNueva(e.target.value);
                  validatePassword(e.target.value);
                  validatePasswordsMatch(e.target.value, contrasenaNuevaRepeat);
                  clearFieldError('contrasenaNueva');
                }}
                disabled={loading}  // Deshabilitar el input mientras carga
              />
              <span
                className={`form__toggle-password pi ${showNewPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                onClick={() => setShowNewPassword(!showNewPassword)}
              ></span>
            </div>
            <div className="form__password-validation">
              <div className={`validation-item ${passwordValidation.minLength ? 'valid' : 'invalid'}`}>
                <span className={`pi ${passwordValidation.minLength ? 'pi-check' : 'pi-times'}`}></span>
                La contraseña debe tener al menos 8 caracteres.
              </div>
              <div className={`validation-item ${passwordValidation.hasLowercase ? 'valid' : 'invalid'}`}>
                <span className={`pi ${passwordValidation.hasLowercase ? 'pi-check' : 'pi-times'}`}></span>
                Debe contener al menos una letra minúscula.
              </div>
              <div className={`validation-item ${passwordValidation.hasUppercase ? 'valid' : 'invalid'}`}>
                <span className={`pi ${passwordValidation.hasUppercase ? 'pi-check' : 'pi-times'}`}></span>
                Debe contener al menos una letra mayúscula.
              </div>
              <div className={`validation-item ${passwordValidation.hasNumbers ? 'valid' : 'invalid'}`}>
                <span className={`pi ${passwordValidation.hasNumbers ? 'pi-check' : 'pi-times'}`}></span>
                Debe contener al menos un número.
              </div>
              <div className={`validation-item ${passwordValidation.hasSpecialChar && passwordValidation.noSpaces ? 'valid' : 'invalid'}`}>
                <span className={`pi ${passwordValidation.hasSpecialChar && passwordValidation.noSpaces ? 'pi-check' : 'pi-times'}`}></span>
                Debe incluir al menos un carácter especial y no contener espacios
              </div>
            </div>
          </div>
          <div className="form__element">
            <div className="form__title">Repetir Contraseña Nueva</div>
            <div className="form__input">
              <input
                type={showRepeatPassword ? "text" : "password"}
                value={contrasenaNuevaRepeat}
                placeholder="Repita la nueva contraseña"
                onChange={e => {
                  setContrasenaNuevaRepeat(e.target.value);
                  validatePasswordsMatch(contrasenaNueva, e.target.value);
                  clearFieldError('contrasenaNuevaRepeat');
                }}
                disabled={loading}  // Deshabilitar el input mientras carga
              />
              <span
                className={`form__toggle-password pi ${showRepeatPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              ></span>
            </div>
            {fieldErrors.contrasenaNuevaRepeat && (
              <div className="form__field-error">
                <span className="pi pi-times"></span>
                El campo es requerido
              </div>
            )}
            {!passwordsMatch && contrasenaNuevaRepeat.length > 0 && (
              <div className="form__password-error">
                <span className="pi pi-times"></span>
                Las contraseñas no coinciden
              </div>
            )}
          </div>

          <div className="form__buttons">
            <button type="submit" className="button" disabled={loading}>
              {loading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" /> : 'Cambiar'}
            </button>
            <Link to="/login" className="button button--white" disabled={loading}>Ir a Inicio de sesión</Link>
          </div>
        </div>
      </form>
    </>
  );
}
