import usePacientes from "../hooks/usePacintes"
import Paciente from "./Paciente"


function ListadoPacientes() {
  const { pacientes } = usePacientes()




  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center"> Listado de pacientes</h2>

          <p className="  text-center mt-5 mb-10 text-xl">
            Administra tus {''}
            <span className="text-indigo-600 ">Pacientes y Citas</span>
          </p>

          {pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) :
        (
          <>
            <h2 className="font-black text-3xl text-center"> No hay pacientes</h2>

            <p className=" text-center mt-5 mb-10 text-xl">
              Comienza Agregando pacientes {''}
              <span className="text-indigo-600 font-bold ">y apareceran en este lugar</span>
            </p>


          </>
        )}

    </>
  )
}

export default ListadoPacientes