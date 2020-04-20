

// state de usuarios
const initialState = {
    usuario: {},
    token: null,
    autenticado: null,
    cargando: false,
    mensaje: null
}


export default function (state = initialState, action) {
    switch (action.type) {

        case 'OBTENER_USUARIO':
        case 'INICIAR_SESION':
        case 'AGREGAR_USUARIO':
            return {
                ...state,
                cargando: action.payload
            }

        case 'INICIAR_SESION_EXITO':
        case 'AGREGAR_USUARIO_EXITO':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                cargando: false,
                autenticado: true,
                token: action.payload.token
            }

        case 'OBTENER_USUARIO_ERROR':
        case 'INICIAR_SESION_ERROR':
        case 'AGREGAR_USUARIO_ERROR':
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: false,
                cargando: false,
                mensaje: action.payload
            }

        case 'OBTENER_USUARIO_EXITO':
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                autenticado: true,
                cargando: false
            }

        case 'CERRAR_SESION':
            localStorage.removeItem('token')
            return {
                usuario: {},
                token: null,
                autenticado: false,
                cargando: false,
            }


        default:
            return state;
    }

}