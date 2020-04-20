import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'


// redux
import { useDispatch, useSelector } from 'react-redux'
import { crearUsuarioAction } from '../redux/actions/usuariosActions'

const IniciarSesion = () => {

    const [error, guardarError] = useState('')

    // states de crear cuenta
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    // extraer de usuario
    const { nombre, email, password, confirmar } = usuario

    const handleLogin = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

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
        if (nombre.trim('') === '' || email.trim('') === '' || password.trim('') === '') {
            guardarError('Todos los campos son obligatorios')
            return;
        }

        // validar mail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            guardarError('La direccion ingresada no es valida')
            return
        }

        // contraseña minimo 6 caracteres
        if (password.length < 6) {
            guardarError('La contraseña debe ser de al menos 6 caracteres')
            return;
        }

        // ver si la contraseña es igual a la de confirmar
        if (password !== confirmar) {
            guardarError('Las contraseñas no coinciden')
            return;
        }


        // borrar mensaje si habia
        guardarError('')

        // crear usuario
        dispatch(crearUsuarioAction(usuario))

    }

    return (
        <Layout pagina={'Crear Cuenta'}>
            <div className="form-background">
                <div className="form-container crear-cuenta">
                    <h2>Crea tu cuenta, es gratis!</h2>
                    <form
                        onSubmit={handleSubmitLogin}
                        className="form">

                        <div className="placeholder-container">
                            <input
                                type="text"
                                name="nombre"
                                placeholder=" "
                                value={nombre}
                                onChange={handleLogin}
                            />
                            <label className="input-placeholder">Nombre</label>
                        </div>

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

                        <div className="placeholder-container">
                            <input
                                type="password"
                                name="confirmar"
                                placeholder=" "
                                value={confirmar}
                                onChange={handleLogin}
                            />
                            <label className="input-placeholder">Confirmar Contraseña</label>
                        </div>

                        <p className="error">{error}</p>
                        <button>Registrame</button>

                    </form>
                    <div className="cambiar-btn">¿Ya Tienes Cuenta?
                        <Link href="/"><a className="switch"> Inicia Sesión</a></Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default IniciarSesion;