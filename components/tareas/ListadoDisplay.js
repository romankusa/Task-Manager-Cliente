import React, { useState, useEffect } from 'react'

import Tarea from './Tarea'
import AgregarLista from './AgregarLista'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerListadosAction } from '../../redux/actions/listadoActions'
import Spinner from '../otros/Spinner'

// animaciones
import { AnimatePresence, motion } from "framer-motion"


const ListadoDisplay = () => {


    const { loading, listado } = useSelector(state => state.listadotareas)

    // obtener listados del usuario
    useEffect(() => {
        dispatch(obtenerListadosAction())
    }, [])
    const dispatch = useDispatch()

    // paginacion
    const [empieza, guardarEmpieza] = useState(0)
    const [termina, guardarTermina] = useState(6)
    const [pagina, guardarPagina] = useState(1)

    const pagination = (tipo) => {
        const resPorPagina = 6;

        if (tipo === 'sig') {
            const nuevaPagina = pagina + 1
            guardarPagina(nuevaPagina)
            guardarTermina(nuevaPagina * resPorPagina)
            guardarEmpieza((nuevaPagina - 1) * resPorPagina)
        }
        else if (tipo === 'ant') {
            const nuevaPagina = pagina - 1
            guardarPagina(nuevaPagina)
            guardarTermina(nuevaPagina * resPorPagina)
            guardarEmpieza((nuevaPagina - 1) * resPorPagina)
        }
    }


    return (
        <>
            {loading ? <Spinner />
                :
                <>
                    <ul className="lista-tareas">
                        <AnimatePresence exitBeforeEnter>
                            {listado.slice(empieza, termina).map(lista => (
                                <motion.div
                                    key={lista.lista._id}
                                    initial={{ opacity: 0, y: 40, scale: 0.90 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.90 }}
                                    transition={{ duration: .3, ease: "easeIn" }}
                                >
                                    <Tarea
                                        lista={lista.lista}
                                        tareas={lista.tareas}
                                    />
                                </motion.div>

                            ))}
                        </AnimatePresence>
                        {pagina >= listado.length / 5 ? <AgregarLista key={1765758435} /> : ''}


                    </ul>
                    <div className="buttons-container">
                        {!listado.length >= 6 ? '' :
                            <>
                                <p
                                    onClick={() => pagination('ant')}
                                    className="anterior">{pagina >= 2 ? 'Anterior' : ''}</p>
                                <p
                                    onClick={() => pagination('sig')}
                                    className="siguiente">{pagina >= listado.length / 5 ? '' : 'Siguiente'}</p>
                            </>
                        }
                    </div>
                </>
            }
        </>


    );
}

export default ListadoDisplay;