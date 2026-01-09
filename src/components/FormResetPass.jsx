import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../services/resetpassService';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {validateEmail} from '../utils/email';
import { useTranslation } from "react-i18next"; 

export function FormResetPass() {
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: false
  });
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [showDialog, setShowDialog] = useState(false);
  const { t } = useTranslation();

  const clearFieldError = (fieldName) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: false }));
    }
  };

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
    
    setLoading(true);  // Activar estado de carga
    try {
      const response = await requestPasswordReset(email);
      if (response.success !== 'OK')
        setMessage(response?.errores?.[0]?.descripcion || `${t("errorCambioPassword")}. ${t("intenteMasTarde")}`);
      else {
        setMessage(t("reseteoPasswordOk"));
      };
      setShowDialog(true);
    } catch (err) {
      setMessage(`${t("errorCambioPassword")}. ${t("intenteMasTarde")}`);
      setShowDialog(true);
    } finally {
      setLoading(false);  // Desactivar estado de carga
    }
  };

  return (
    <>
      <Dialog visible={showDialog} footer={<button className='button' onClick={() => setShowDialog(false)}>{t("entendido")}</button>} onHide={() => setShowDialog(false)}>
        <p>{message}</p>
      </Dialog>
      {loading && <div className="loading-overlay"><ProgressSpinner /></div>}
      <form className="form" autoComplete='off' onSubmit={handleSubmit}>
        <div className="form__header">
          <h3>{t("restaurarPassword")}</h3>
          <p>{t("ingreseEmailCambiarPassword")}:</p>
        </div>
        <div className="form__body">
          <div className="form__element">
            <div className="form__title">Email</div>
            <div className="form__input">
              <input
                type="text"
                value={email}
                placeholder={t("ingreseEmail")}
                autoComplete='off'
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
          <div className="form__buttons">
            <button type="submit" className="button" disabled={loading}>
              {loading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" /> : 'Solicitar'}
            </button>
            <Link to="/login" className="button button--white" disabled={loading}>{t("irInicioSesion")}</Link>
          </div>
        </div>
      </form>
    </>
  );
}
