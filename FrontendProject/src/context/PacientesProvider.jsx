import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios.js";

const PacientesContext = createContext()

// eslint-disable-next-line react/prop-types
const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data)

            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

        obtenerPacientes()
    }, [])



    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                
                const pacientesActualizados = pacientes.map(PacienteState => PacienteState._id === data._id ? data : PacienteState)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                // eslint-disable-next-line no-unused-vars
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                // eslint-disable-next-line no-unused-vars
                const { __v, updatedAt, createdAt, ...pacienteAlmacenado } = data
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

    }

    const setEdicion = ({ paciente }) => {
        setPaciente(paciente)
    }


    const setEliminar = async (id) =>{
        const confirmar = confirm('¿Confirmas que deseas eliminar este paciente?')

        if(confirmar){

            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios.delete(`/pacientes/${id}`,config)
                const pacientesActualizados = pacientes.filter( pacientEliminao => pacientEliminao._id !== id)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error)
            }
            return
        }
        return



    }


    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                setEliminar

            }}>

            {children}

        </PacientesContext.Provider>
    )
}


export {
    PacientesProvider,

}
export default PacientesContext