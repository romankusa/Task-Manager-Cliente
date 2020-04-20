import React, { useEffect, useState } from 'react'
import Tags from '../tareaDisplay/Tags'
import ResumenTarea from './ResumenTarea'


// redux
import { useDispatch, useSelector } from 'react-redux'
import { seleccionarListadoAction } from '../../redux/actions/listadoActions'


const Tarea = ({ lista, tareas }) => {

    const [width, guardarWidth] = useState(0)
    const [listadotareas, guardarListadoTareas] = useState({})

    // redux
    const dispatch = useDispatch()

    const { tareamodificada } = useSelector(state => state.tareas)


    const handleClick = (listado) => {
        dispatch(seleccionarListadoAction(listado))
    }

    const calcularWidth = tareas => {
        if (tareas.length === 0) {
            guardarWidth(0)
            return
        }
        const estadoTrue = tareas.reduce((acc, cur) => (acc += cur.estado === true ? + 1 : 0), 0)
        const porcentaje = (100 * estadoTrue) / tareas.length
        guardarWidth(porcentaje)
    }

    useEffect(() => {
        if (tareamodificada) {
            if (tareamodificada.lista === listadotareas.lista && tareamodificada.lista && listadotareas.lista) {
                // si se elimina una seccion, eliminar las tareas que habia
                const ids = tareamodificada.tareas.map(el => el._id);
                let nuevastareas = [];
                listadotareas.tareas.forEach(el => ids.indexOf(el._id) === -1 ? nuevastareas.push(el) : '')
                const nuevolistado = {
                    lista: listadotareas.lista,
                    tareas: nuevastareas
                }
                guardarListadoTareas(nuevolistado)
                calcularWidth(nuevolistado.tareas)
            }
            else if (tareamodificada.tareaid && listadotareas.tareas) {
                //borrar tarea
                const nuevolistado = {
                    lista: listadotareas.lista,
                    tareas: listadotareas.tareas.filter(el => el._id !== tareamodificada.tareaid)
                }
                guardarListadoTareas(nuevolistado)
                calcularWidth(nuevolistado.tareas)
            } else if (tareamodificada.listaid === listadotareas.lista && tareamodificada.listaid && listadotareas.lista) {
                // agregar tarea
                const nuevolistado = {
                    lista: listadotareas.lista,
                    tareas: [...listadotareas.tareas, tareamodificada.tarea]
                }
                guardarListadoTareas(nuevolistado)
                calcularWidth(nuevolistado.tareas)
            } else if (Object.keys(tareamodificada).length > 0 && listadotareas.tareas) {
                // cambiar tarea
                const nuevolistado = {
                    lista: listadotareas.lista,
                    tareas: listadotareas.tareas.map(el => el._id === tareamodificada._id ? tareamodificada : el)
                }
                guardarListadoTareas(nuevolistado)
                calcularWidth(nuevolistado.tareas)
            } else if (!listadotareas.tareas && tareamodificada.tarea) {
                // crear lista
                const nuevolistado = {
                    lista: tareamodificada.listaid,
                    tareas: [tareamodificada.tarea]
                }
                guardarListadoTareas(nuevolistado)
                calcularWidth(nuevolistado.tareas)
            }
        }
    }, [tareamodificada])


    useEffect(() => {
        if (tareas) {
            calcularWidth(tareas)
            guardarListadoTareas({ tareas: tareas, lista: lista._id })
        } else {
            guardarListadoTareas({ tareas: [], lista: lista._id })
        }
    }, [lista, tareas])

    const maxLength = nombre => {
        return nombre.length >= 17 ? nombre.slice(0, 17) + '...' : nombre
    }

    return (
        <>
            <li className="tarea-individual-container">

                <ul className="tags-container">
                    {!lista.tags ? '' :
                        <Tags key={lista.tags[0]._id} tags={lista.tags[0]} />
                    }
                </ul>
                <h4
                    onClick={() => handleClick({ lista })}
                >{maxLength(lista.nombre)}</h4>

                <ul className="resumen-tareas-container">
                    {!listadotareas.tareas ? '' :
                        listadotareas.tareas.slice(0, 2).map(el => (
                            <ResumenTarea key={el._id} nombre={el.nombretarea} />
                        ))
                    }
                </ul>

                <div className="barra-de-progreso-container">
                    {!lista.tags ? '' :
                        <div style={{ background: `${lista.tags[0].color}`, width: `${width}%` }} className="barra-de-progreso"></div>
                    }
                </div>

            </li>

        </>
    );
}

export default Tarea;