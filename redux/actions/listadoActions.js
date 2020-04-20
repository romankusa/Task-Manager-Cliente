import clienteAxios from '../config/axios'

// obtener listados
export function obtenerListadosAction() {

    return async (dispatch) => {

        dispatch(obtenerListados())

        try {
            const res = await clienteAxios.get('/api/lista')

            dispatch(obtenerListadosExito(res.data))
        } catch (e) {
            console.log(e)

            dispatch(obtenerListadosError(e.response.data.msg))
        }
    }
}

const obtenerListados = () => ({
    type: 'OBTENER_LISTADOS',
    payload: true
})

const obtenerListadosExito = listas => ({
    type: 'OBTENER_LISTADOS_EXITO',
    payload: listas
})

const obtenerListadosError = error => ({
    type: 'OBTENER_LISTADOS_ERROR',
    payload: error
})


// agregar listado
export function agregarListadoAction(listado) {

    return async (dispatch) => {

        dispatch(agregarListado())

        try {

            const res = await clienteAxios.post('/api/lista', listado)

            dispatch(agregarListadoExito(res.data))


        } catch (e) {
            console.log(e)

            dispatch(agregarListadoError(e.response.data.errores))
        }
    }
}

const agregarListado = () => ({
    type: 'AGREGAR_LISTADO',
    payload: true
})

const agregarListadoExito = lista => ({
    type: 'AGREGAR_LISTADO_EXITO',
    payload: lista
})

const agregarListadoError = error => ({
    type: 'AGREGAR_LISTADO_ERROR',
    payload: error
})



// seleccionar listado
export function seleccionarListadoAction(listado) {
    return async (dispatch) => {
        dispatch(seleccionarListado(listado))
    }
}

const seleccionarListado = (listado) => ({
    type: 'SELECCIONAR_LISTADO',
    payload: listado
})


// eliminar listado
export function eliminarListadoAction(id) {

    return async (dispatch) => {
        dispatch(eliminarListado())

        try {

            await clienteAxios.delete(`/api/lista/${id}`)

            dispatch(eliminarListadoExito(id))

        } catch (e) {
            console.log(e)

            dispatch(eliminarListadoError(e.response.data.msg))
        }
    }
}

const eliminarListado = () => ({
    type: 'ELIMINAR_LISTADO',
    payload: true
})


const eliminarListadoExito = (id) => ({
    type: 'ELIMINAR_LISTADO_EXITO',
    payload: id
})

const eliminarListadoError = (msg) => ({
    type: 'ELIMINAR_LISTADO_ERROR',
    payload: msg
})


// agregar tags
export function agregarTagsAction(lista) {

    return async (dispatch) => {
        dispatch(agregarTags())

        try {

            const res = await clienteAxios.put(`/api/lista/${lista._id}`, lista)

            dispatch(agregarTagsExito(res.data))
        }
        catch (e) {
            console.log(e)

            dispatch(agregarTagsError(e.response.data.msg))

        }
    }
}
const agregarTags = () => ({
    type: 'AGREGAR_TAGS',
    payload: true
})


const agregarTagsExito = listanueva => ({
    type: 'AGREGAR_TAGS_EXITO',
    payload: listanueva
})

const agregarTagsError = msg => ({
    type: 'AGREGAR_TAGS_ERROR',
    payload: msg
})

