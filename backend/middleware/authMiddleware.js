import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinaria.js';


const checkAuth = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoden = jwt.verify(token,process.env.JWT_SECRET)

            req.veterinario = await Veterinario.findById(decoden.id).select(
                "-password -token -confirmado"
            )
           return next()

        } catch (error) {
            const msg = new Error("Tenemos un problema");
            return res.status(404).json({ msg: msg.message });
        }
        
    }

    if(!token){
        const error = new Error("Token no valido o inexistente");
        res.status(404).json({ msg: error.message });
    }
    
     return next()
};

export default checkAuth;
