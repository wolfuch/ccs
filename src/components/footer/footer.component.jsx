import React from 'react';

import '../../css/styles.css';

const Footer = () => {
    return (

        <footer className="fondoF">
            <div className="container">
                
                {/* Logo */}
                <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">

                    <div className="col-md-8 col-xs-8 col-12 mt-5">
                        <a href=""><img src={process.env.PUBLIC_URL + '/img/logoFooter.svg'} className="img-fluid logo" alt="Responsive" ></img></a>
                    </div>
                    
                </div>
                
                
                {/* direccion, telefono, correo */}
                <div className="row d-flex text-center justify-content-center mb-md-0 mb-4 mt-3">
                    <div className="col-md-3 col-xs-3 mx-auto">
                        <img src={process.env.PUBLIC_URL + '/img/icon/map.svg'} alt="Responsive"/> 
                        <span className="spanFooter fuente" > Monjitas #392, Santiago - Chile</span>
                    </div>
                    <div className="col-md-3 col-xs-3 mx-auto">
                        <img src={process.env.PUBLIC_URL + '/img/icon/telefono.svg'} alt="Responsive"/> 
                        <span className="spanFooter"> +56 2 2818 5706</span>
                    </div>
                    <div className="col-md-3 col-xs-3 mx-auto">
                        <img src={process.env.PUBLIC_URL + '/img/icon/arroba.svg'} alt="Responsive"/> 
                        <span className="spanFooter"> rednegocios@ccs.cl</span>
                    </div>
                </div>
                
                {/*Copyright*/}
                <div className="row d-flex text-center justify-content-center mb-md-0">
                    <div className="col-md-8 col-xs-8 col-12 mt-3">
                        <p className=" spanFooter" >
                            &copy; 2021 - RED NEGOCIOS CCS
                            <br/>
                            Todos los Derechos Reservados
                            <br/>
                            <a className='ater' href="http://www.rednegocios.cl/terminos-condiciones/" target="_blank" rel="noreferrer" >Términos y condiciones</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;