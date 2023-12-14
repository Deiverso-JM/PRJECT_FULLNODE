import  Express  from "express";
import { agregarPacientes, obtnerPacientes,obtnerPaciente,actualizarPaciente,eliminarPaciente} from "../controllers/pacienteController.js";
const router = Express.Router();
import checkAuth from "../middleware/authMiddleware.js";

router.route('/')
    .post(checkAuth,agregarPacientes)
    .get(obtnerPacientes)

router
    .route('/:id')
    .get(checkAuth, obtnerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;