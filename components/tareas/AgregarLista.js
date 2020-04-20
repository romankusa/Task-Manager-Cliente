import React, { useState } from 'react'


// redux
import { useDispatch, useSelector } from 'react-redux'
import { agregarListadoAction } from '../../redux/actions/listadoActions'


const AgregarLista = () => {

    const [agregar, guardarAgregar] = useState(false)

    // state de nuevo listado
    const [listado, guardarListado] = useState({
        nombre: ''
    })

    const { nombre } = listado

    const handleChange = e => {
        guardarListado({
            ...listado,
            [e.target.name]: e.target.value
        })
    }


    // redux
    const dispatch = useDispatch()

    // agregar listado
    const handleSubmit = e => {
        e.preventDefault();

        // subir a la base de datos
        dispatch(agregarListadoAction(listado))

        // reiniciar form
        guardarListado({
            nombre: ''
        })

        // cerrar form
        guardarAgregar(false)

    }

    return (
        <>

            {!agregar ?
                <div className="tarea-individual-container agregar-lista-container">
                    <img
                        className="agregar-btn"
                        src="/static/img/plus.svg"
                        alt=""
                        onClick={() => guardarAgregar(true)}
                    />
                </div>

                :
                <div className="tarea-individual-container agregar-lista-container">
                    <img
                        className="cancel"
                        src="/static/img/cancel.svg"
                        alt=""
                        onClick={() => guardarAgregar(false)}
                    />
                    <form
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={handleChange}
                        />
                        <button>Crear</button>
                    </form>
                </div>
            }


        </>
    );
}

export default AgregarLista;