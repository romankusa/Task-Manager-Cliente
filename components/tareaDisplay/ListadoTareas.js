import React, { useState, useEffect } from 'react'


// redux
import { useSelector, useDispatch } from 'react-redux'
import { eliminarTareaAction, agregarTareaAction } from '../../redux/actions/tareasActions'


// animaciones
import { motion } from "framer-motion"


const ListadoTareas = ({ tareaindividual, id }) => {


    const [estado, guardarEstado] = useState(null)

    useEffect(() => {
        if (tareaindividual.estado) {
            guardarEstado(tareaindividual.estado)
        }
    }, [])


    // Redux
    const dispatch = useDispatch()

    const { listadoseleccionado } = useSelector(state => state.listadotareas)

    //eliminar tarea
    const eliminarTarea = () => {
        dispatch(eliminarTareaAction({ lista: listadoseleccionado._id, tareaid: tareaindividual._id, id: id }))
    }

    // cambiar estado
    const handleClick = () => {
        dispatch(agregarTareaAction({ lista: listadoseleccionado._id, id, _id: tareaindividual._id, tareas: [{ estado: !estado }] }))
        guardarEstado(!estado)
    }


    return (
        <motion.li
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80, transition: { duration: .3 } }}
            className="tarea-individual-container">
            <div className="checkbox">
                <input defaultChecked={tareaindividual.estado === true ? 'true' : ''} onClick={handleClick} className="check" type="checkbox" name={tareaindividual.nombretarea} id={tareaindividual.nombretarea} value={tareaindividual.nombretarea} />
                <label htmlFor={tareaindividual.nombretarea} id="checkbox">
                    <svg className="svg" viewBox="0 0 100 100">
                        <path className="box" d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z" />
                        <polyline className="check" points="25.5,53.5 39.5,67.5 72.5,34.5 " />
                    </svg>
                </label>
            </div>
            <p style={{ opacity: `${!estado ? '1' : '.2'}` }}>{tareaindividual.nombretarea}</p>
            <p
                onClick={eliminarTarea}
                className="eliminar">Eliminar</p>
        </motion.li>
    );
}

export default ListadoTareas;