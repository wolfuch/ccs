const isIdentified = (resultado) => Boolean(resultado) && resultado.idUsuario > 0;

export const resolveAuthenticationOutcome = (resultado) => {
  if (isIdentified(resultado)) {
    const { token, idUsuario, listadoSistemas } = resultado;

    if (resultado.contrasenaValidada) {
      if (listadoSistemas.length > 0) {
        return { kind: 'authenticated', token, userIdentifier: idUsuario, listadoSistemas };
      }
      return { kind: 'noSystemsAvailable' };
    }

    return { kind: 'passwordChangeRequired' };
  }

  return { kind: 'invalidCredentials' };
};
