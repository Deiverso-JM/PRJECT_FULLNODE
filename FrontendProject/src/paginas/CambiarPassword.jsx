import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

function CambiarPassword() {

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nueva: ''
  })


  const {guardarPassword} = useAuth()

  const handelSubmit = async (e) => {
    e.preventDefault()


    if(Object.values(password).some(campo => campo === '')){
      return setAlerta({
        msg: 'Debes rellenar los campos',
        error: true
      })
    }

    if(password.pwd_nueva.length < 6){
      return setAlerta({
        msg: 'La nueva Clave debe ser mas larga',
        error: true
      })
    }

    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
  }


  const { msg } = alerta
  return (
    <>


      <AdminNav />

      <h2 className="font-black text-3xl  text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Informacion aqui</span></p>

      {(msg && <Alerta alerta={alerta} />)}
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 shadow rounded-lg p-5">
          <form onSubmit={handelSubmit}>
            <div className="my-3">
              <label htmlFor="" className=" uppercase font-bold text-gray-600">Password Actual *</label>
              <input type="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " name="pwd_actual" placeholder="Escribe tu Password actual"  onChange={e => setPassword({
                ...password, [e.target.name]: e.target.value
              })} />
            </div>

            <div className="my-3">
              <label htmlFor="" className=" uppercase font-bold text-gray-600">Password Nuevo *</label>
              <input type="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " name="pwd_nueva" placeholder="Escribe tu Password Nuevo"  onChange={e => setPassword({
                ...password, [e.target.name]: e.target.value
              })} />
            </div>


            <input type="submit" value="Actualizar Password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white w-full uppercase rounded-lg mt-5" />
          </form>
        </div>
      </div>

    </>
  )
}

export default CambiarPassword