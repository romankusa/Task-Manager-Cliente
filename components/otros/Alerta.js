import React, { useEffect, useState, useRef } from 'react'


// redux
import { useSelector } from 'react-redux'


const Alerta = () => {

    const [abrir, setAbrir] = useState({
        estado: false,
        mensaje: ''
    })

    const mensajeListado = useSelector(state => state.listadotareas.mensaje)
    const mensajeTareas = useSelector(state => state.tareas.mensaje)



    useEffect(() => {

        if (mensajeListado) {
            setAbrir({
                estado: true,
                mensaje: mensajeListado
            })
        } else if (mensajeTareas) {
            setAbrir({
                estado: true,
                mensaje: mensajeTareas
            })
        }
        else {
            setAbrir({
                estado: false,
                mensaje: ''
            })
        }


    }, [mensajeListado, mensajeTareas])


    const fondo = useRef()
    const btn = useRef()

    // abrir y cerrar request form
    const handleClick = () => {
        setAbrir({
            estado: false,
            mensaje: ''
        });
    }

    return (
        <>
            {!abrir.estado ? '' :
                <div className="alerta-container" onClick={handleClick}>
                    <div className="alerta-mensaje-container">
                        <h4>{abrir.mensaje}</h4>
                        <button>Ok</button>
                    </div>
                </div>
            }
        </>
    );
}

export default Alerta;