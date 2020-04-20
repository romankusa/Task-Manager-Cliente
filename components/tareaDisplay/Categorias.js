import React from 'react'
import ListadoTareas from './ListadoTareas'
import AgregarTarea from './AgregarTarea'


// redux
import { useSelector, useDispatch } from 'react-redux'
import { eliminarTareaAction } from '../../redux/actions/tareasActions'


// animaciones
import { AnimatePresence } from "framer-motion"

const Categorias = ({ tarea }) => {


    // redux
    const { listadoseleccionado } = useSelector(state => state.listadotareas)

    const dispatch = useDispatch();

    const borrarSeccion = () => {
        dispatch(eliminarTareaAction({ id: tarea._id, lista: listadoseleccionado._id }))
    }


    return (

        <>
            {Object.keys(tarea).length <= 0 ? '' :
                <li className="categoria-individual-container">

                    <div className="categoria-top">
                        <h3>{tarea.nombreseccion}</h3>
                        <div className="separador"></div>
                        <img
                            onClick={borrarSeccion}
                            className="cancel" src="/static/img/cancel.svg" alt="" />
                    </div>

                    <ul className="listado-tareas-container">
                        <AnimatePresence>
                            {tarea.tareas.length <= 0 ? '' :
                                tarea.tareas.map(tareaindividual => (
                                    <ListadoTareas
                                        key={tareaindividual._id}
                                        id={tarea._id}
                                        tareaindividual={tareaindividual} />
                                ))
                            }
                        </AnimatePresence>
                        <AgregarTarea id={tarea._id} />
                    </ul>
                </li>
            }
        </>
    );
}

export default Categorias;