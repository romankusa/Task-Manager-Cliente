import clienteAxios from '../config/axios'
import Router from 'next/router';
import tokenAuth from '../config/tokenAuth'


// crear nuevo usuairo
export function crearUsuarioAction(usuario) {

    return async (dispatch) => {
        dispatch(agregarUsuario());


        try {
            const res = await clienteAxios.post('/api/usuarios', usuario);

            // actualizar state
            dispatch(agregarUsuarioExito(res.data))

            // enviar usuario a la pagina principal
            Router.push('/tareas')

        } catch (e) {
            console.log(e)

            // si hay un error cambiar el state
            dispatch(agregarUsuarioError(e.response.data.msg))

        }
    }
}


const agregarUsuario = () => ({
    type: 'AGREGAR_USUARIO',
    payload: true
})

const agregarUsuarioExito = (data) => ({
    type: 'AGREGAR_USUARIO_EXITO',
    payload: data
})

const agregarUsuarioError = (errores) => ({
    type: 'AGREGAR_USUARIO_ERROR',
    payload: errores
})


// iniciar sesion
export function iniciarSesionAction(usuario) {

    return async (dispatch) => {
        dispatch(iniciarSesion());


        try {
            const res = await clienteAxios.post('/api/auth', usuario);

            // actualizar state
            dispatch(iniciarSesionExito(res.data))

            // enviar usuario a la pagina principal
            Router.push('/tareas')

        } catch (e) {
            console.log(e)

            // si hay un error cambiar el state
            dispatch(iniciarSesionError(e.response.data.msg))

        }
    }
}

const iniciarSesion = () => ({
    type: 'INICIAR_SESION',
    payload: true
})

const iniciarSesionExito = data => ({
    type: 'INICIAR_SESION_EXITO',
    payload: data
})

const iniciarSesionError = error => ({
    type: 'INICIAR_SESION_ERROR',
    payload: error
})


// obtener usuario autenticado
export function obtenerUsuarioAction() {

    return async (dispatch) => {
        dispatch(obtenerUsuario());

        const token = localStorage.getItem('token');

        if (token) {
            tokenAuth(token)
        }

        try {
            const res = await clienteAxios.get('/api/auth');

            // actualizar state
            dispatch(obtenerUsuarioExito(res.data.usuario))

            // enviar usuario a la pagina principal
            Router.push('/tareas')

        } catch (e) {
            console.log(e)

            // si hay un error cambiar el state
            dispatch(obtenerUsuarioError(e.response.data.msg))

        }
    }
}

const obtenerUsuario = () => ({
    type: 'OBTENER_USUARIO',
    payload: true
})

const obtenerUsuarioExito = data => ({
    type: 'OBTENER_USUARIO_EXITO',
    payload: data
})

const obtenerUsuarioError = error => ({
    type: 'OBTENER_USUARIO_ERROR',
    payload: error
})


// cerrar sesion
export function cerrarSesionAction() {

    return (dispatch) => {
        dispatch(cerrarSesion());

        // enviar el usuario a login
        Router.push('/')
    }
}


const cerrarSesion = () => ({
    type: 'CERRAR_SESION',
})