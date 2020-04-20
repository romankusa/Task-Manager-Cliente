import { combineReducers } from 'redux'
import listadoReducer from './listadoReducer'
import usuariosReducer from './usuariosReducer'
import tareasReducer from './tareasReducer'

export default combineReducers({
    listadotareas: listadoReducer,
    usuarios: usuariosReducer,
    tareas: tareasReducer,
})
