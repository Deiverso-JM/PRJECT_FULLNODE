import Express  from "express";
const router = Express.Router();
import { perfil, registrar, confirmar, autenticar, olvidePassword,comprobarToken,nuevoPassword } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

//Autenticar - area publica
router.post('/', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
//Perfil - area privada
router.get('/perfil',checkAuth, perfil)

export default router;