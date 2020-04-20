import clienteAxios from '../config/axios'


// buscar tareas del listado
export function mostrarTareasAction(_id) {

    return async (dispatch) => {

        dispatch(mostrarTareas())

        try {
            const res = await clienteAxios.get('/api/tarea/', { params: { _id } })

            dispatch(mostrarTareasExito(res.data.secciones))

        } catch (e) {
            console.log(e)

            dispatch(mostrarTareasError(e.response.data.msg))
        }

    }
}


const mostrarTareas = () => ({
    type: 'MOSTRAR_TAREAS',
    payload: true
})

const mostrarTareasExito = (secciones) => ({
    type: 'MOSTRAR_TAREAS_EXITO',
    payload: secciones
})

const mostrarTareasError = (error) => ({
    type: 'MOSTRAR_TAREAS_ERROR',
    payload: error
})



// crear una seccion
export function agregarSeccionAction(seccion) {

    return async (dispatch) => {

        dispatch(agregarSeccion())

        try {

            const res = await clienteAxios.post('/api/tarea/', seccion)

            dispatch(agregarSeccionExito(res.data.tarea))

        } catch (e) {
            console.log(e)

            dispatch(agregarSeccionError(e.response.data.msg))
        }
    }
}


const agregarSeccion = () => ({
    type: 'AGREGAR_SECCION',
    payload: true
})

const agregarSeccionExito = (tarea) => ({
    type: 'AGREGAR_SECCION_EXITO',
    payload: tarea
})

const agregarSeccionError = (error) => ({
    type: 'AGREGAR_SECCION_ERROR',
    payload: error
})




// agregar una tarea
export function agregarTareaAction(tarea) {

    return async (dispatch) => {
        dispatch(agregarTarea())


        try {
            const res = await clienteAxios.put(`/api/tarea/${tarea.id}`, tarea)

            if (res.data.seccion) {
                dispatch(agregarTareaExito(res.data.seccion))
            } else {
                dispatch(cambiarWidth(res.data))
            }
        } catch (e) {
            console.log(e)

            dispatch(agregarTareaError(e.response.data.msg))

        }
    }
}

const agregarTarea = () => ({
    type: 'AGREGAR_TAREA',
    payload: true
})


const agregarTareaExito = seccion => ({
    type: 'AGREGAR_TAREA_EXITO',
    payload: seccion
})

const cambiarWidth = tarea => ({
    type: 'CAMBIAR_WIDTH',
    payload: tarea
})

const agregarTareaError = msg => ({
    type: 'AGREGAR_TAREA_ERROR',
    payload: msg
})




// eliminar una tarea
export function eliminarTareaAction(tarea) {

    return async (dispatch) => {
        dispatch(eliminar())


        try {
            const res = await clienteAxios.delete(`/api/tarea/${tarea.id}`, { params: { tarea } })

            if (res.data.tipo === 'seccion') {
                dispatch(eliminarSeccionExito(res.data._id))
            } else {
                dispatch(eliminarTareaExito(res.data))
            }
        } catch (e) {
            console.log(e)

            dispatch(eliminarTareaError(e.response.data.msg))
        }
    }
}

const eliminar = () => ({
    type: 'ELIMINAR',
    payload: true
})

const eliminarTareaExito = (tareas) => ({
    type: 'ELIMINAR_TAREA_EXITO',
    payload: tareas
})

const eliminarSeccionExito = (id) => ({
    type: 'ELIMINAR_SECCION_EXITO',
    payload: id
})

const eliminarTareaError = (msg) => ({
    type: 'ELIMINAR_TAREA_ERROR',
    payload: msg
})