

// state de listado de tareas
const initialState = {
    listado: [],
    listadoseleccionado: {},
    loading: true,
    mensaje: null,
}


export default function (state = initialState, action) {

    switch (action.type) {

        case 'OBTENER_LISTADOS':
            return {
                ...state,
                loading: action.payload,
                listadoseleccionado: {},
                mensaje: null
            }

        case 'ELIMINAR_LISTADO':
            return {
                ...state,
                listadoseleccionado: {},
                mensaje: null
            }

        case 'OBTENER_LISTADOS_EXITO':
            return {
                ...state,
                listado: action.payload,
                loading: false,
                mensaje: null,
                listadoeliminado: null
            }

        case 'OBTENER_LISTADOS_ERROR':
            return {
                ...state,
                listado: [],
                listadoseleccionado: {},
                mensaje: action.payload,
                loading: false,
            }

        case 'AGREGAR_LISTADO_EXITO':
            return {
                ...state,
                listado: [...state.listado, action.payload],
                loading: false,
                mensaje: null
            }

        case 'ELIMINAR_LISTADO_EXITO':
            return {
                ...state,
                listado: state.listado.filter(el => el.lista._id !== action.payload),
                loading: false,
            }

        case 'AGREGAR_TAGS_ERROR':
        case 'ELIMINAR_LISTADO_ERROR':
        case 'AGREGAR_LISTADO_ERROR':
            return {
                ...state,
                mensaje: action.payload,
                loading: false,
            }
        case 'SELECCIONAR_LISTADO':
            return {
                ...state,
                listadoseleccionado: action.payload.lista,
                loading: false,
            }

        case 'AGREGAR_TAGS_EXITO':
            return {
                ...state,
                listado: state.listado.map(({ lista, tareas }) => lista._id === action.payload._id ? { lista: action.payload, tareas } : { lista, tareas }),
                listadoseleccionado: action.payload,
                loading: false
            }




        default:
            return state;
    }

}