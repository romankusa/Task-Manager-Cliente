


// state tareas
const initialState = {
    tareas: [],
    tareamodificada: {},
    cargandotareas: false,
    mensaje: null
}


export default function (state = initialState, action) {
    switch (action.type) {


        case 'MOSTRAR_TAREAS':
            return {
                ...state,
                tareas: [],
                cargandotareas: true,
            }

        // case 'ELIMINAR':
        // case 'AGREGAR_SECCION':
        //     return {
        //         ...state,
        //         cargandotareas: true,
        //     }

        case 'MOSTRAR_TAREAS_EXITO':
            return {
                ...state,
                tareas: action.payload,
                tareamodificada: {},
                cargandotareas: false
            }

        case 'AGREGAR_SECCION_ERROR':
        case 'AGREGAR_TAREA_ERROR':
        case 'ELIMINAR_TAREA_ERROR':
        case 'MOSTRAR_TAREAS_ERROR':
            return {
                ...state,
                cargandotareas: false,
                mensaje: action.payload
            }

        case 'AGREGAR_SECCION_EXITO':
            return {
                ...state,
                tareas: [...state.tareas, action.payload],
                cargandotareas: false,
            }

        case 'AGREGAR_TAREA_EXITO':
            return {
                ...state,
                tareas: state.tareas.map(el => el._id === action.payload._id ? action.payload : el),
                tareamodificada: { tarea: action.payload.tareas[action.payload.tareas.length - 1], listaid: action.payload.lista },
                mensaje: null,
                cargandotareas: false,
            }

        case 'ELIMINAR_TAREA_EXITO':
            return {
                ...state,
                tareas: state.tareas.map(el => el._id === action.payload.seccion._id ? action.payload.seccion : el),
                tareamodificada: { tareaid: action.payload.tareaid },
                cargandotareas: false,
            }

        case 'CAMBIAR_WIDTH':
            return {
                ...state,
                tareamodificada: action.payload,
                mensaje: null,
            }

        case 'ELIMINAR_SECCION_EXITO':
            return {
                ...state,
                tareamodificada: state.tareas.filter(el => el._id === action.payload)[0],
                tareas: state.tareas.filter(el => el._id !== action.payload),
                mensaje: null,
                cargandotareas: false,
            }


        default:
            return state;

    }
}