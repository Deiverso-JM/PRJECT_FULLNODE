import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienAxios from '../config/axios'


function NewPassword() {
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const params = useParams()
  const { token } = params
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nuevo Password',
          error: false
        })

        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error, enlace no valido',
          error: true
        })
      }
    }

    comprobarToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { msg } = alerta

  const handelSubmit = async (e) =>{
    e.preventDefault() 

    if(password.length < 6 ){
      return setAlerta({
        msg: 'La contraseña debe ser minimo 7 caracteres',
        error: true
      })
    }

    try{
      const url = `/veterinarios/olvide-password/${token}`
      const {data} = await clienAxios.post(url, {password})
      
      console.log(data)

      setAlerta({
        msg: data.msg,
        error: false
      })


      setTokenValido(false)
      setPasswordModificado(true)
    }catch(error){
      setAlerta({
        msg: error.response.data.msg
      })
    }
  }
  return (
    <>
      <div>
        <h1 className=" text-indigo-600 text-6xl font-black ">Restablece tu password y no pierdas Acesso a  {""} <span className="text-black">Tus Pacientes</span></h1>

      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta
          alerta={alerta}
        />}

        {tokenValido && (
          <form action="" onSubmit={handelSubmit} >
            <div className="my-5">
              <label className=" uppercase text-gray-600 text-xl block font-bold" htmlFor="">
                Nueva Contraseña
              </label>
              <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                type="password" name="" id=""
                placeholder="Tu contraseña"
                value={password}

                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className='w-full flex justify-center'>
              <input type="submit" value="Guardar Nueva contraseña"
                className="bg-indigo-700 w-full py-3 rounded-xl  text-white uppercase font-bold mt-5 hover:cursor-pointer 
                   hover:bg-indigo-800 md:w-auto md:mx-auto px-10 "/>
            </div>
          </form>
        )}

        <nav className='mt-10'>
          
          {passwordModificado && <Link className='block text-center my-5 text-gray-500 hover:text-gray-900'
            to="/">¿Ya tienes cuenta?, Inicia Session</Link>
          }
        </nav>
      </div>

    </>

  )
}

export default NewPassword