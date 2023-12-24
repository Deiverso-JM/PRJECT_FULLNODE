import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios.js'


function OlvidePassword() {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})
  const handelSubmit = async  (e) =>{
    e.preventDefault()

    //VALIDACION
    if(email === '' || email.length < 6){
      setAlerta({
        msg: 'El campo esta vacio, debe rellenarse',
        error: true
      })
      return  
    }

    //ENVIAR PETICION
    try {
      const { data }  = await clienteAxios.post('/veterinarios/olvide-password', {email})
      setAlerta({
        msg: data.msg,
        error: false,
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg, 
        error: true})
    }

  }
  
  const {msg} = alerta
  return (

    <>
      <div>
        <h1 className=" text-indigo-600 text-6xl font-black ">Recupera tu Acceso y no Pierdas {""}<span className="text-black ">tus Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg &&
          <Alerta
            alerta={alerta}
          />
      }
        <form action="" onSubmit={handelSubmit} >
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl block font-bold" htmlFor="">
              Email
            </label>
            <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="email" name="" 
              placeholder="Email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}


            />
          </div>
          <input type="submit" value="Restablecer Contraseña"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer 
           hover:bg-indigo-800 md:w-auto px-10 "/>

        </form>
        <nav className='mt-10 lg:flex lg:justify-between '>
          <Link className='block text-center my-5 text-gray-500 hover:text-gray-900'
            to="/Registrar">¿No tienes una Cuenta?, Registrate</Link>
          <Link className='block text-center my-5 text-gray-500  hover:text-gray-900'
            to="/">¿Ya tienes una Cuenta?, Ingresa</Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword