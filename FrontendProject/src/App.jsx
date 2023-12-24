import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayouth from "./layout/AuthLayouth"
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import OlvidePassword from "./paginas/olvide-password"
import NewPassword from "./paginas/NewPassword"

function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayouth/>}>
          <Route index element={<Login/>}/> 
          <Route path="registrar" element={<Registrar/>}/>
          <Route path="olvide-password" element={<OlvidePassword/>}/>
          <Route path="olvide-password/:token" element={<NewPassword/>}/>
          <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
