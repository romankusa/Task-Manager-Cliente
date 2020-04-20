import React, { useState } from 'react'


// redux
import { useDispatch, useSelector } from 'react-redux'
import { agregarTareaAction } from '../../redux/actions/tareasActions'


const AgregarTarea = ({ id }) => {

    const [agregar, guardarAgregar] = useState(false)

    const [nombretarea, guardarTarea] = useState('')


    const { listadoseleccionado } = useSelector(state => state.listadotareas)

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault();

        // validar
        if (nombretarea.trim('') === '') {
            return
        }

        //subir tarea
        dispatch(agregarTareaAction({ lista: listadoseleccionado._id, tareas: [{ nombretarea }], id }))

        // reiniciar y cerrar form
        guardarAgregar(false)
        guardarTarea('')

    }

    return (
        <div className="agregar-tarea-container">
            {!agregar ?
                <button
                    onClick={() => guardarAgregar(true)}
                >Agregar +</button>

                :
                <>
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
                            name='nombretarea'
                            value={nombretarea}
                            onChange={(e) => guardarTarea(e.target.value)}
                        />
                        <button>Crear</button>
                    </form>
                </>

            }

        </div>
    );
}

export default AgregarTarea;