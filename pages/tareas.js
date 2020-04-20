import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import Tarea from '../components/tareas/Tarea'
import TareaDisplay from '../components/tareaDisplay/TareaDisplay'
import SeleccionaDisplay from '../components/tareaDisplay/SeleccionaDisplay'
import AgregarLista from '../components/tareas/AgregarLista';

import Router from 'next/router';

// redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerUsuarioAction, cerrarSesionAction } from '../redux/actions/usuariosActions'
import ListadoDisplay from '../components/tareas/ListadoDisplay';
import Spinner from '../components/otros/Spinner';


const Tareas = () => {

    const [cargandotoken, guardarCargandoToken] = useState(true)

    const dispatch = useDispatch()

    const { usuario, cargando, autenticado } = useSelector(state => state.usuarios)
    const { mensaje, listadoseleccionado } = useSelector(state => state.listadotareas)

    // autenticar usuario
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            Router.push('/')
        } else if (token) {
            dispatch(obtenerUsuarioAction())
            guardarCargandoToken(false)
        }
    }, [])

    // cerrar sesion
    const handleCerrarSesion = () => {
        dispatch(cerrarSesionAction())
    }

    useEffect(() => {
        if (!autenticado) {
            Router.push('/')
        }
    }, [autenticado])

    return (
        <>
            <Layout pagina={'Inicio'}>
                {cargandotoken ?
                    <div className="" style={{ marginTop: "200px" }}>
                        <Spinner />
                    </div>
                    :
                    mensaje && !cargando ? <p>{mensaje}</p> :

                        <div className="tareas-background">
                            <div className="tareas-container">

                                <div className="lista-tareas-container">

                                    <div className="sub-menu">
                                        <h5>Bienvenido de nuevo {usuario.nombre}</h5>
                                        <p
                                            onClick={handleCerrarSesion}
                                            className="cerrar-sesion">Cerrar Sesion</p>
                                    </div>

                                    <ListadoDisplay key={1} />
                                </div>

                                <div className="tarea-display-container">
                                    {Object.keys(listadoseleccionado).length <= 0 ?
                                        <SeleccionaDisplay key={3} />
                                        :
                                        <TareaDisplay key={2} />
                                    }

                                </div>
                            </div>
                        </div>


                }
            </Layout>
        </>
    );
}




export default Tareas;