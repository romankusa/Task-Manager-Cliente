import clienteAxios from './axios'
import Router from 'next/router';

const tokenAuth = token => {
    if (token) {
        clienteAxios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete clienteAxios.defaults.headers.common['x-auth-token']

        Router.push('/')
    }
}

export default tokenAuth