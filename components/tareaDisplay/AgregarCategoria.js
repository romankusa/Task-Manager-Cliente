import React, { useState } from 'react'


// redux
import { useDispatch, useSelector } from 'react-redux'
import { agregarSeccionAction } from '../../redux/actions/tareasActions'


const AgregarCategoria = () => {

    const [agregar, guardarAgregar] = useState(false)

    const [nombreseccion, guardarSeccion] = useState('')

    const { listadoseleccionado } = useSelector(state => state.listadotareas)

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault();

        // validar form
        if (nombreseccion.trim() === '') {
            return;
        }

        // subir a base de datos
        dispatch(agregarSeccionAction({ nombreseccion, lista: listadoseleccionado._id }))

        // reiniciar y cerrar formulario
        guardarSeccion('')
        guardarAgregar(false)

    }


    return (
        <>

            {!agregar ?
                <div className="agregar-categoria-container">
                    <img
                        src="/static/img/plus.svg"
                        alt=""
                        onClick={() => guardarAgregar(true)}
                    />
                </div>
                :
                <div className="categoria-top">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="nombreseccion"
                            placeholder="Nombre"
                            value={nombreseccion}
                            onChange={(e) => guardarSeccion(e.target.value)}
                        />
                        <button>Crear</button>
                    </form>
                    <div className="separador"></div>
                    <img
                        className="cancel"
                        src="/static/img/cancel.svg"
                        alt=""
                        onClick={() => guardarAgregar(false)}
                    />
                </div>
            }

        </>
    );
}

export default AgregarCategoria;