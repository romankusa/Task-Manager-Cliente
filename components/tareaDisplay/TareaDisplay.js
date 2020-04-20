import React, { useState, useEffect } from 'react'
import Tags from './Tags'
import Categorias from './Categorias'
import AgregarCategoria from './AgregarCategoria'
import Opciones from './Opciones'
import AgregarTag from './AgregarTag'


// redux
import { useDispatch, useSelector } from 'react-redux'
import { mostrarTareasAction } from '../../redux/actions/tareasActions'
import Spinner from '../otros/Spinner'


const TareaDisplay = () => {

    const [toggleOpciones, GuardarToggleOpciones] = useState(false)
    const [editartag, guardarEditarTag] = useState(false)

    const dispatch = useDispatch()

    const { listadoseleccionado } = useSelector(state => state.listadotareas)
    const { tareas, cargandotareas } = useSelector(state => state.tareas)

    useEffect(() => {
        if (listadoseleccionado._id) {
            dispatch(mostrarTareasAction(listadoseleccionado._id))
        }
    }, [listadoseleccionado])

    return (
        <div className="display-container">
            <ul className="tags-container">
                {!editartag ?
                    <>
                        <Tags tags={listadoseleccionado.tags[0]} />
                        <button
                            onClick={() => guardarEditarTag(true)}
                            className="editar-tag">Editar Tag</button>
                    </>
                    :
                    <AgregarTag listado={listadoseleccionado} guardarEditarTag={guardarEditarTag} />
                }


            </ul>

            <div className="display-top">
                <h2>{listadoseleccionado.nombre}</h2>
                <div
                    onClick={() => GuardarToggleOpciones(!toggleOpciones)}
                    className="opciones">
                    <div className="opciones-item"></div>
                    <div className="opciones-item"></div>
                    <div className="opciones-item"></div>
                </div>
                {!toggleOpciones ? '' :
                    <Opciones id={listadoseleccionado._id} />
                }
            </div>

            <ul className="categorias-container">
                {cargandotareas ? <Spinner /> :
                    tareas.length <= 0 ?
                        <>
                            <AgregarCategoria />
                        </>
                        :
                        <>
                            {tareas.map(tarea => (
                                <Categorias
                                    key={tarea._id}
                                    tarea={tarea} />
                            ))}
                            <AgregarCategoria />
                        </>
                }
            </ul>
        </div>
    );
}

export default TareaDisplay;