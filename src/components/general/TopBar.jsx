import CambiarLenguaje from "../general/cambiarLenguaje";

const TopBar = () => {
    return (
        <div style={{display: "flex", justifyContent: "flex-end", alignItems: "end", gap: "5px",
            padding: "5px",
            pointerEvents: "none"
        }}>
             <CambiarLenguaje /> 
        </div>
    )
}

export default TopBar;