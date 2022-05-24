import Swal from "sweetalert2";

export const MostrarMensaje = (titulo, mensaje, icono, accion=null) => {
    Swal.fire({
      title: titulo,
      icon: icono,
      text: mensaje,
      confirmButtonText: "Continuar",
      confirmButtonColor: "#083c70",
      buttonsStyling: "false"
    }).then(() => {
        !!accion && accion();
        // accion && accion()
      });
  }

  export const MostrarMensajeHTML = (titulo, mensaje, icono, accion=null) => {
    Swal.fire({
      title: titulo,
      icon: icono,
      html: mensaje,
      confirmButtonText: "Continuar",
      confirmButtonColor: "#083c70",
      buttonsStyling: "false"
    }).then(() => {
        !!accion && accion();
        // accion && accion()
      });
  }
  

  export const MostrarMensajePregunta = (titulo, mensaje, icono, txtBtnAceptar, txtBtnCancelar, accion=null) => {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: icono,
      showCancelButton: true,
      confirmButtonText: txtBtnAceptar,
      confirmButtonColor: "#083c70",
      allowOutsideClick: false,
      buttonsStyling: "false",
      cancelButtonText: txtBtnCancelar,
    }).then((result) => {
      if (result.isConfirmed) {
        !!accion && accion();
      }
    })
  }
  
  export const MostrarMensajePreguntaHTML = (titulo, mensaje, icono, txtBtnAceptar, txtBtnCancelar, accion=null) => {
    Swal.fire({
      title: titulo,
      html: mensaje,
      icon: icono,
      showCancelButton: true,
      confirmButtonText: txtBtnAceptar,
      confirmButtonColor: "#083c70",
      allowOutsideClick: false,
      buttonsStyling: "false",
      cancelButtonText: txtBtnCancelar,
    }).then((result) => {
      if (result.isConfirmed) {
        !!accion && accion();
      }
    })
  }