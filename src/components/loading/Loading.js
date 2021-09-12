import React from 'react'
import './Loading.css';
export const Loading = () => {
    return (
        <div className='loading'>
            <img src={process.env.PUBLIC_URL + "/img/Spinner.svg"} alt='Cargando...'/> 
        </div>
    )
}