import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: "https://task-manager-servidor.herokuapp.com/"
})

export default clienteAxios

