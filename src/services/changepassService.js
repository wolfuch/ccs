export const changePassword = async (email, contrasenaActual, contrasenaNueva) => {
    try {
      const response = await fetch('https://desaapi.rednegocios.cl/api/v1/auth/recovery', {
        method: 'POST',
        headers: {
          'Connection': 'keep-alive',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contrasenaActual,
          contrasenaNueva,
        }),
      });
  
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
  
      const data = await response.json();
      return data; // Maneja la respuesta según sea necesario
    } catch (error) {
      console.error('Error during password change:', error);
      throw error;
    }
  };
  