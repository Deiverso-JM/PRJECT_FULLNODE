import { useEffect , useState} from 'react'
import { useParams, Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

function ConfirmarCuenta() {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando]  = useState(true)
  const [alerta, setAlerta]  = useState({})



  const params = useParams()
  const {id } = params

  useEffect(()=>{
    const confirmarCuenta = async () =>{
      try {
        const url = `/veterinarios/confirmar/${id}`
        const  { data } = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({msg: data.msg, error: false})
      } catch (error) {
        setAlerta({msg: error.response.data.msg, error: true})
      }
      setCargando(false)
    }

    confirmarCuenta()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <>
      <div>
        <h1 className=" text-indigo-600 font-black text-6xl">
          Confirmar tu Cuenta y  Comeinza a Administrar {""}
          <span className="text-black">Tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando &&   <Alerta
        alerta={alerta}
        />}
        
      
      {cuentaConfirmada && <Link to="/" className='block text-center my-5 text-gray-500 hover:text-black'>¿Ya tienes una cuenta?, Inicia Sesion</Link>}
      </div>
    
    </>
  )
}

export default ConfirmarCuenta