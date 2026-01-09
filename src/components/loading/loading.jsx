import React from 'react'
import './Loading.css'
export const Loading = ({...otherProps}) => {
    return (
        <div className='loading' {...otherProps}>
            <img src={"/img/Spinner.svg"} alt='Cargando...'/> 
        </div>
    )
}