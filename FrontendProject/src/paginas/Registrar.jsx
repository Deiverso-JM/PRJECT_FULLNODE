import { Link } from "react-router-dom"
import {useState} from 'react'
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"



function Registrar() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState('')



  const handelSubmit = async (e) =>{
    e.preventDefault()

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: "Hay campos vacios", error: true})

      return
    }

    if(password !== repetirPassword){
      setAlerta({msg: "Los Password no Coinciden", error: true})
      return
    }

    if(password.length < 6 ){
      setAlerta({msg: "La Contraseña es demasiado corta", error: true})
      return
    }


    setAlerta({})

    //Crear el usuario en la Api

    try {
      const url = `/veterinarios`
      // eslint-disable-next-line no-unused-vars
      const respuesta = await clienteAxios.post(url, {nombre, email,password})
      setAlerta({msg: 'Creado Correctamente, revisa tu email',  error:  false})
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }


  }

  const {msg} = alerta
  return (
    <>
      <div>
        <h1 className=" text-indigo-600 text-6xl font-black w-9/12 ">Crea tu Cuenta y Administra {""}<span className="text-black ">tus Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        
        {msg && <Alerta 
          alerta={alerta}
        />}
        <form action=""
        onSubmit={handelSubmit} >
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl block font-bold" htmlFor="">
              Nombre
            </label>
            <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="text" name="" 
              placeholder="Tu Nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl block font-bold" htmlFor="">
              Email
            </label>
            <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="emails" name="" 
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl block font-bold" htmlFor="">
              Password
            </label>
            <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="password" name="" 
              placeholder="Tu Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl block font-bold" htmlFor="">
              Repite tu password
            </label>
            <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="password" name="" 
              placeholder="Tu Password"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Registrarse"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer 
           hover:bg-indigo-800 md:w-auto px-10 "/>

        </form>
        <nav className='mt-10 lg:flex lg:justify-between '>
          <Link className='block text-center my-5 text-gray-500 hover:text-gray-900' 
          to="/">¿Ya tienes una Cuenta?, Ingresa</Link>
          <Link className='block text-center my-5 text-gray-500  hover:text-gray-900' 
          to="/olvide-password">¿Olvidaste tu contraseña?</Link>
        </nav>
      </div>
    </>

  )
}

export default Registrar