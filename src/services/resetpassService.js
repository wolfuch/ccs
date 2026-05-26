const API_URL = import.meta.env.VITE_API_WEBAPI;

export const requestPasswordReset = async (email) => {
    try {
      const response = await fetch(`${API_URL}/v1/auth/recoveryRequest/${email}`, {
        method: 'GET',
        headers: {
          'Connection': 'keep-alive',
          'Content-Type': 'application/json',
        },
      });
  
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
  
      const data = await response.json();
      return data; // Maneja la respuesta según sea necesario
    } catch (error) {
      console.error('Error during password reset request:', error);
      throw error;
    }
  };
  