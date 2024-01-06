import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Header() {

    const { cerraSesion } = useAuth()
  return (
    <header className="py-10 bg-indigo-600">
        <div className=" container mx-auto  flex md:flex-row flex-col justify-between items-center p-5">
            <h1 className=" font-bold text-2xl text-indigo-200 text-center md:text-start">Administrador de Pacientes de {""} <span className=" text-white font-black ">Veterinaria</span></h1>


            <nav className="flex gap-4 mt-6">
                <Link to="/admin" className="text-white text-sm font-bold hover:text-gray-200  uppercase">Pacientes</Link>
                <Link to="/admin/perfil" className="text-white text-sm font-bold hover:text-gray-200  uppercase">Perfil</Link>

                <button
                    type="button"
                    onClick={cerraSesion}
                    className="text-white text-sm uppercase font-bold">
                        Cerrar Sesion
                </button>
            </nav>
        </div>

    </header>
  )
}

export default Header