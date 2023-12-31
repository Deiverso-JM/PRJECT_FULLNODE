import { useState } from 'react'

import Formulario from '../components/Formulario'
import ListadoPacientes from '../components/ListadoPacientes'

//Listado de clientes

function AdministrarPacientes() {
  const [mostarFormulario, setMostrarFormulario] = useState(false)

  return (
    <div className='flex flex-col md:flex-row  font-bold'>
      <button 
        type="button"
        className='bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-5 md:hidden 
        '
        onClick={() => mostarFormulario ? setMostrarFormulario(false) : setMostrarFormulario(true)}
      >
        {mostarFormulario ? 'Ocultar formulario' : 'Mostrar Formulario'}
      </button>
      <div className={`${mostarFormulario ? 'block' : 'hidden' } md:w-1/2 lg:w-2/5 md:block`}>
        <Formulario/>
      </div>

      <div className='md:w-1/2 lg:w-3/5'>
        <ListadoPacientes/>
      </div>
    </div>


  )
}

export default AdministrarPacientes