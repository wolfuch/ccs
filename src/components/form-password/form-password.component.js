import React, {useState} from "react";
import './form-password.component.css'

const FormPassword = ({ handleChange, ...otherProps }) => {
    const [estadoPassword, setEstadoPassword] = useState('password')

    const [counter, setCounter] = React.useState(100);
  const intervalRef = React.useRef(null);

  React.useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

    const showHide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEstadoPassword(estadoPassword === 'text' ? 'password' : 'text')
    }

    const startCounter = () => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            setEstadoPassword('text')
        }, 10);
      };
    
      const stopCounter = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setEstadoPassword('password')
        }
      };
    

return (
    <div className="form-group">
        <div className="input-group">
            <input className="form-control prepend" type={estadoPassword} onChange={handleChange} {...otherProps}/>
            <span className="input-group-text-pass"      
                onMouseDown={startCounter}
                onMouseUp={stopCounter}
                onMouseLeave={stopCounter}>
                <i className={estadoPassword == 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>                
            </span>
        </div>
    </div>
);
} 
export default FormPassword;