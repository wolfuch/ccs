import React from 'react';

import '../../css/styles.css';

const Footer = () => {
    return (
        <footer className="fondoF">
            <div className="container">
                
                {/* Logo */}
                <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">

                    <div className="col-md-8 col-xs-8 col-12 mt-5">
                        <a href="/"><img src={process.env.PUBLIC_URL + '/img/logoFooter.svg'} className="img-fluid logo" alt="img-fluid logo"/> </a>
                    </div>
                    
                </div>
                
                
                {/* direccion, telefono, correo */}
                <div className="row d-flex text-center justify-content-center mb-md-0 mb-4 mt-3">
                    <div className="col-md-3 col-xs-3 mx-auto">
                        <img src={process.env.PUBLIC_URL + '/img/icon/map.svg'}  alt="map"/> 
                        <a className="ater" href="https://maps.app.goo.gl/YLuqakxmywqw5BEP8" target="_blank" rel="noreferrer" >
                            <span className="spanFooter fuente" > Monjitas #392, Santiago - Chile</span>
                        </a>
                    </div>
                    <div className="col-md-3 col-xs-3 mx-auto">
                        <img src={process.env.PUBLIC_URL + '/img/icon/telefono.svg'} alt="telefono"/> 
                        <a className="ater" href="tel:+56227120257">
                            <span className="spanFooter"> +56 2 2712 0257</span>
                        </a>
                    </div>
                    <div className="col-md-3 col-xs-3 mx-auto">
                        <img src={process.env.PUBLIC_URL + '/img/icon/arroba.svg'} alt="arroba"/>
                        <a className="ater" href="mailto:contacto@rednegocios.cl">
                            <span className="spanFooter"> contacto@rednegocios.cl</span>
                        </a>
                    </div>
                </div>
                
                
                
                
                {/*Copyright*/}
                <div className="row d-flex text-center justify-content-center mb-md-0">
                    <div className="col-md-8 col-xs-8 col-12 mt-3">
                        <p className=" spanFooter" >
                            &copy; 2024 - RED NEGOCIOS CCS 
                            <br/>
                            Todos los Derechos Reservados
                            <br/>
                            <a className='ater' target="_blank" rel="noreferrer" href="https://www.rednegocios.cl/terminos-condiciones/">Términos y condiciones</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;