import React from 'react'


// redux
import { useDispatch } from 'react-redux'
import { eliminarListadoAction } from '../../redux/actions/listadoActions'



const Opciones = ({ id }) => {


    // redux
    const dispatch = useDispatch()

    const eliminarLista = () => {
        dispatch(eliminarListadoAction(id))
    }

    return (
        <div className="opciones-container">
            <div className="opcion">
                <p onClick={eliminarLista}>Eliminar Lista</p>
            </div>
        </div>
    );
}

export default Opciones; 