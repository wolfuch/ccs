import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const hasChecked = useRef(false);

  useEffect(() => {
    // Evitar doble ejecución en StrictMode durante desarrollo
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Verificar si la navegación fue interna (desde el sistema)
    const isInternalNavigation = sessionStorage.getItem('internalNavigation');
        
    if (!isInternalNavigation) {
      // Si no hay navegación interna, redirigir a login
      navigate('/login', { replace: true });
      return;
    }

    // Limpiar el flag después de usarlo
    sessionStorage.removeItem('internalNavigation');
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
