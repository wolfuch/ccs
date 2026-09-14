const API_URL = import.meta.env.VITE_API_WEBAPI;

export const login = async (email, password) => {
  try {
    const body = { email, password };

    const response = await fetch(`${API_URL}/v1/auth`, {
      method: 'POST',
      headers: {
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const registraIngreso = async (idSistema, idUsuario) => {
  try {
    const response = await fetch(`${API_URL}/v1/RegistraIngreso`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('t')}`,
      },
      body: JSON.stringify({
        "idSistema": idSistema,
        "idUsuario": idUsuario,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to register system access');
    }

    const data = await response.json();
    
    if (data.success === 'OK') {
      return data.resultado;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Error during system access registration:', error);
    throw error;
  }
};

export const renew = async (token) => {
  try {
    const response = await fetch(`${API_URL}/v1/auth/renew`, {
      method: 'GET',
      headers: {
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.replace(/"/g, "")}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const ObtenerNuevoToken = async (token,idSistema) => {
  try {
    const response = await fetch(`${API_URL}/v1/auth/ObtenerTokenSistemaIngresado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        "OldToken": token,
        "IdSistemaIngresado": idSistema,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to register system access');
    }
    const data = await response.json();
    if (data.success === 'OK') {
      return data.resultado;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Error during system access registration:', error);
    throw error;
  }
};
