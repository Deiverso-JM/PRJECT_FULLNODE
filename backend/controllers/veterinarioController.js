import generarId from "../helpers/generarID.js";
import Veterinario from "../models/Veterinaria.js"
import generarJWT from "../helpers/generarJWT.js";


const registrar = async (req,res) =>{
    const {email} = req.body
    
    //Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({email})
    if(existeUsuario){
        const error  = new Error('Usuario Ya Registrado');
        return res.status(400).json({msg: error.message})
    }

    try {
        //Guardar Nuevo Veterinario
        const veterinario = new Veterinario(req.body)
        const veterinarioGuardado = await veterinario.save()
        
        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)
    }
}
const autenticar =  async (req,res) =>{
    const {email, password} = req.body
    const usuario = await Veterinario.findOne({email})

    //Si el man existe
    if(!usuario){
        const error  = new Error('Usuario no encontrado');
        return res.status(404).json({msg: error.message})
    }

    //Usuario esta confirmado?
    if(!usuario.confirmado){
        const error  = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message})
    }

    //Revisar si el Password esta bien

    if(await usuario.comprobarPassword(password)){
        //Autenticar
        res.json({token: generarJWT(usuario.id)})

    }else{
        const error = new Error("password Incorrecto")
        return res.status(403).json({msg: error.message})
        
    }
    
}


const confirmar = async (req, res) =>{
    const {token} = req.params
    const usuarioConfirmar = await Veterinario.findOne({token});
    if(!usuarioConfirmar){
        console.log("AQUI")
        const error  = new Error('Token no valido');
        console.log(error)
        return res.status(404).json({msg: error.message})
    }

    try {
        usuarioConfirmar.token = null
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()
        
        res.json({msg: "Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const perfil = (req,res)=>{
    const {veterinario} = req.veterinario

    return res.status(400).json({ msg: "PERFIL" });
    

}

const olvidePassword = async (req,res) =>{
    const { email } =req.body
    const existVeterinario = await Veterinario.findOne({email}) 

    if(!existVeterinario){
        const error = new Error('El usuario no existe')
        return res.status(400).json({msg: error.message})
    }

    try {
        existVeterinario.token = generarId()
        await existVeterinario.save()
        res.json({msg: "Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error)
    }

    return res.status(400).json({ msg: "Contraseña" });
}
const comprobarToken = async (req,res) =>{
   const {token} = req.params
   const tokenValido = await Veterinario.findOne({token})
   if(tokenValido){
    //El usuario existe
    res.json({msg: "Token valido y existe"})
   }else{
    const error = new Error('Token No valido')
    return res.json({msg: error.message})   
   }
}
const nuevoPassword = async (req,res) =>{
   const {token} = req.params
   const {password} = req.body

   const veterinario = await Veterinario.findOne({token})
   if(!veterinario){
    const error = new Error('Usuario no existe');
    return res.json({msg: error.message})   
   }
   console.log(password)

   try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save()
    res.json({msg: "Nuevo password Guardado"})
    
    
   } catch (error) {
    console.log(error)
   }

}
export {
    registrar,
    autenticar,
    confirmar,
    perfil,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}