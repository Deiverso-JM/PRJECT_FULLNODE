// eslint-disable-next-line no-unused-vars
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";


const AuthContext = createContext()
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) =>{



    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    

    useEffect(() =>{
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')

            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        }

        autenticarUsuario()
    }, [])


    const cerraSesion = () =>{
        localStorage.removeItem('token')
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerraSesion
            }}>
            {children}
        </AuthContext.Provider>
    )
}


export{
    AuthProvider,

}

export default AuthContext