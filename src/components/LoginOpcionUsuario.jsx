import React from 'react'
import { useSelector } from 'react-redux';

export const LoginOpcionUsuario = () => {
    
    const { listadoSistemas }  = useSelector( state => state.auth );

    console.log(listadoSistemas);

    return (
        
        <div className="cardAzul p-5" >
        <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
            <div className="col-md-12 col-xs-12 col-12 login-form-1">
                <a><img src={process.env.PUBLIC_URL + '/img/logoFooter.svg'} className="img-fluid logo" alt="Responsive image" ></img></a>
                <p style={{color:'white',fontSize:'25px',margin:'25px'}}>Ingreso<strong> Usuario</strong></p>
            </div>
            <div className="col-md-8">
                
                  
            {
                listadoSistemas && 
                listadoSistemas.map(sistema =>(
                    <div className="form-group mt-2">
                        <button 
                        className="btnSubmit btnLogin"
                        value="INGRESAR" 
                        key={sistema.idSistema}>
                            {sistema.nombreSistema}
                        </button>
                    </div>
                ))
            }




                                
                            
            </div>
        </div>
    </div>

         
    )
}
