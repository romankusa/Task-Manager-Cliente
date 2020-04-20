import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { iniciarSesionAction } from '../redux/actions/usuariosActions'
import Alerta from '../components/otros/Alerta'

const IniciarSesion = () => {

    const [error, guardarError] = useState('')

    // states de login
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    })

    const { email, password } = usuario

    const handleLogin = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // redux
    // state de mensaje de error de redux
    const errorServidor = useSelector(state => state.usuarios.mensaje)

    useEffect(() => {
        if (errorServidor) {
            errorServidor ? guardarError(errorServidor) : '';
        }
    }, [errorServidor])

    // dispatch para llamar al action
    const dispatch = useDispatch();

    const handleSubmitLogin = e => {
        e.preventDefault()

        // validar formulario
        if (email.trim('') === '' || password.trim('') === '') {
            guardarError('Todos los campos son obligatorios')
            return;
        }

        // validar mail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            guardarError('La direccion ingresada no es valida')
            return
        }

        // borrar mensaje si habia
        guardarError('')

        // iniciar sesion en base de datos
        dispatch(iniciarSesionAction(usuario))

    }

    return (
        <>
            <Layout pagina={'Iniciar Sesión'}>
                <Alerta />
                <div className="form-background">
                    <div className="form-container">
                        <h2>Iniciar Sesión</h2>
                        <form
                            onSubmit={handleSubmitLogin}
                            className="form">

                            <div className="placeholder-container">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={handleLogin}
                                />
                                <label className="input-placeholder">Email</label>
                            </div>

                            <div className="placeholder-container">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder=" "
                                    value={password}
                                    onChange={handleLogin}
                                />
                                <label className="input-placeholder">Contraseña</label>
                            </div>
                            <p className="error">{error}</p>
                            <button>Iniciar Sesión</button>
                        </form>
                        <div className="cambiar-btn">¿No Tienes Cuenta?
                            <Link href="/crear-cuenta"><a className="switch"> Registrate</a></Link>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default IniciarSesion;