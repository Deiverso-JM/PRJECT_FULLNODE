import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import { PacientesProvider } from "./context/PacientesProvider"



//PUBLIC
import AuthLayouth from "./layout/AuthLayouth"
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import OlvidePassword from "./paginas/olvide-password"
import NewPassword from "./paginas/NewPassword"



//PRIVATE
import RutaProtegida from "./layout/RutaProtegida"
import AdministrarPacientes from "./paginas/AdministrarPacientes"
import CambiarPassword from "./paginas/CambiarPassword"
import EditarPerfil from "./paginas/EditarPerfil"




function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayouth />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
              <Route  path="perfil" element={<EditarPerfil />} />

            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>




    </BrowserRouter>
  )
}

export default App
