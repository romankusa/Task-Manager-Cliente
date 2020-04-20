import React, { useState } from 'react'


// redux
import { useDispatch } from 'react-redux'
import { agregarTagsAction } from '../../redux/actions/listadoActions'



const AgregarTag = ({ guardarEditarTag, listado }) => {

    const [error, guardarError] = useState('')

    const [tags, guardarTags] = useState({
        tagnombre: '',
        color: '#'
    })

    const { tagnombre, color } = tags;

    const handleChange = (e) => {
        guardarTags({
            ...tags,
            [e.target.name]: e.target.value
        })
    }

    // redux
    const dispatch = useDispatch()


    // form
    const agregarTag = e => {
        e.preventDefault();

        if (/^#[0-9A-F]{6}$/i.test(color) !== true && color.trim('') !== '') {
            guardarError('Color no válido. Ejemplo: #A8DADC')
            setTimeout(() => {
                guardarError('')
            }, 10000)
            return
        }

        // agregar a la base de datos
        listado.tags = [tags]
        dispatch(agregarTagsAction(listado))

        // reiniciar form y cerrar
        guardarTags({
            tagnombre: '',
            color: ''
        })
        guardarEditarTag(false)
    }


    return (
        <li className="agregar-tag-container">
            <img
                className="cancel"
                src="/static/img/cancel.svg"
                alt=""
                onClick={() => guardarEditarTag(false)}
            />
            <form action="">
                <input
                    type="text"
                    name="tagnombre"
                    placeholder="Nombre"
                    value={tagnombre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="color"
                    placeholder="#A8DADC"
                    value={color}
                    onChange={handleChange}
                />
                <label htmlFor="color">Ej: #A8DADC, etc</label>
                <button onClick={agregarTag}>Crear</button>
                <p className="error-tags">{error}</p>
            </form>
        </li>
    );
}

export default AgregarTag;