import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div>
        <h1 className=" text-indigo-600 text-6xl font-black ">Inicia Sesion y Administra Tus <span className="text-black">Pacientes</span></h1>

      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        <form action="" >
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl block font-bold" htmlFor="">
              Email
            </label>
            <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
            type="emails" name="" id="" 
            placeholder="Email de registro"
            />
          </div>
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl block font-bold" htmlFor="">
              Password
            </label>
            <input className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
            type="text" name="" id="" 
            placeholder="password de registro"
            />
          </div>
          <input type="submit" value="Iniciar Sesion"
           className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer 
           hover:bg-indigo-800 md:w-auto px-10 "/>

        </form>
        <nav className='mt-10 lg:flex lg:justify-between '>
          <Link className='block text-center my-5 text-gray-500 hover:text-gray-900' 
          to="/Registrar">¿No tienes una cuenta?, Registrate</Link>
          <Link className='block text-center my-5 text-gray-500  hover:text-gray-900' 
          to="/olvide-Password">¿Olvidaste tu contraseña?</Link>
        </nav>
      </div>
    </>
  )
}

export default Login