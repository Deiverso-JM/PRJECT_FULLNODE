import { useEffect, useState } from "react"
import usePacientes from "../hooks/usePacintes"
import Alerta from '../components/Alerta'
function Formulario() {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [propietario, setPropietario] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)


    const [alerta, setAlerta] = useState({})


    const { guardarPaciente, paciente } = usePacientes()

    const handelSubmit = (e) => {
        e.preventDefault()

        //Validar el formulario 
        if ([nombre, email, propietario, fecha, sintomas].includes('')) {
            return setAlerta({
                msg: 'Debes rellenar todos los campos',
                error: true
            })
        }

        
        guardarPaciente({ nombre, email, propietario, fecha, sintomas, id})
        
        setAlerta({msg: 'Paciente Actualizado', error: false})

        setNombre(''); 
        setPropietario(''); 
        setEmail(''); 
        setFecha(''); 
        setSintomas('');
        setId('')

    }

    useEffect(() =>{
        if(paciente?.nombre){
            setNombre(paciente.nombre || ''); // Asegúrate de que no sea undefined
            setId(paciente._id); // Asegúrate de que no sea undefined
            setPropietario(paciente.propietario || ''); // Asegúrate de que no sea undefined
            setEmail(paciente.email || ''); // Asegúrate de que no sea undefined
            setFecha(new Date(paciente.fechaAlta).toLocaleDateString('en-CA') || ''); // Asegúrate de que no sea undefined
            setSintomas(paciente.sintomas || '');
        }
    }, [paciente])

    const { msg } = alerta
    return (
        <>
            <h2 className="font-black text-3xl text-center"> Agregar nuevos pacientes</h2>

            <p className="  text-center mt-5 mb-10 text-xl">
                Administra tus {''}
                <span className="text-indigo-600 ">Pacientes y Citas</span>
            </p>

            <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
                onSubmit={handelSubmit}  >
                <div className="mb-5">
                    <label htmlFor="nombre"
                        className="text-gray-700 uppercase  font-bold">Nombre Mascota:</label>
                    <input id="nombre" type="text" placeholder="Nombre de la Mascota"
                        onChange={(e) => setNombre(e.target.value)} className=" border-2 border-gray-300 w-full p-2 mt-2 rounded-lg"
                        value={nombre} />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario"
                        className="text-gray-700 uppercase  font-bold">Nombre Propietario:</label>
                    <input id="propietario" type="text" placeholder="Nombre del Propietario"
                        onChange={(e) => setPropietario(e.target.value)}
                        value={propietario}
                        className=" border-2 border-gray-300 w-full p-2 mt-2 rounded-lg" />
                </div>
                <div className="mb-5">
                    <label htmlFor="email"
                        className="text-gray-700 uppercase  font-bold">Email Propietario:</label>
                    <input id="email" type="email" placeholder="Email del propietario" className=" border-2 border-gray-300 w-full p-2 mt-2 rounded-lg" onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha"
                        className="text-gray-700 uppercase  font-bold">Fecha Alta:</label>
                    <input id="fecha" type="date" placeholder="Fecha de alta" className=" border-2 border-gray-300 w-full p-2 mt-2 rounded-lg" onChange={(e) => setFecha(e.target.value)}
                        value={fecha} />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas"
                        className="text-gray-700 uppercase  font-bold">Sintomas:</label>
                    <textarea id="sintomas" placeholder="Describe los Sintomas" className=" border-2 border-gray-300 w-full p-2 mt-2 rounded-lg" onChange={(e) => setSintomas(e.target.value)}
                        value={sintomas} />
                </div>

                <input type="submit"
                    className="bg-indigo-600 uppercase  w-full p-3 font-bold text-white cursor-pointer"
                    value={id ? 'Guardar Cambios' : 'Agregar Paciente'} />

            </form>
            {(msg && <Alerta  alerta={alerta} />)}

        </>
    )
}

export default Formulario