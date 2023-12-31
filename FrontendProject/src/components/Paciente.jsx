import usePacientes from "../hooks/usePacintes"


// eslint-disable-next-line react/prop-types
function Paciente({ paciente }) {
    // eslint-disable-next-line react/prop-types
    const { email, fechaAlta, nombre, propietario, sintomas, _id } = paciente
    const { setEdicion, setEliminar} = usePacientes()
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-CP', { dateStyle: 'long' }).format(nuevaFecha)
    }



    return (
        <div className="mx-5  my-10 bg-white shadow-md  px-5 py-10  rounded-xl">
            <p className=" font-bold uppercase text-indigo-600   ">Nombre:
                <span className=" font-normal normal-case text-black"> {nombre}</span>
            </p>
            <p className=" font-bold uppercase text-indigo-600   my-3 ">Propietario:
                <span className=" font-normal normal-case text-black"> {propietario}</span>
            </p>            <p className=" font-bold uppercase text-indigo-600  my-3  ">Email Contacto:
                <span className=" font-normal normal-case text-black"> {email}</span>
            </p>            <p className=" font-bold uppercase text-indigo-600 my-3   ">Fecha de Alta:
                <span className=" font-normal normal-case text-black"> {formatearFecha(fechaAlta)}</span>
            </p>            <p className=" font-bold uppercase text-indigo-600  my-3  ">Sintomas:
                <span className=" font-normal normal-case text-black"> {sintomas}</span>
            </p>

            <div className="flex justify-between my-5 ">
                <button onClick={() => setEdicion({paciente})} className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-md ">
                    Editar
                </button>
                <button onClick={() => setEliminar(_id)} className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-md ">
                    Eliminar
                </button>
            </div>
        </div>



    )
}

export default Paciente