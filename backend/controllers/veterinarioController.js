import generarId from "../helpers/generarID.js";
import Veterinario from "../models/Veterinaria.js";
import generarJWT from "../helpers/generarJWT.js";
import emailRegistro from "../helpers/emailRegistro.js";
import olvideEmail from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    const { email, nombre } = req.body;

    //Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email });
    if (existeUsuario) {
        const error = new Error("Usuario Ya Registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        //Guardar Nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        //Enviar Email

        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token,
        });

        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
};
const autenticar = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Veterinario.findOne({ email });

    //Si el man existe
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    //Usuario esta confirmado?
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
    }

    //Revisar si el Password esta bien

    if (await usuario.comprobarPassword(password)) {
        //Autenticar
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
        });
    } else {
        const error = new Error("password Incorrecto");
        return res.status(403).json({ msg: error.message });
    }
};

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({ msg: "Usuario confirmado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

const perfil = (req, res) => {
    const { veterinario } = req;
    return res.json(veterinario);
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const existVeterinario = await Veterinario.findOne({ email });

    if (!existVeterinario) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
    }

    try {
        existVeterinario.token = generarId();
        await existVeterinario.save();

        //Enviar Email con instucciones
        olvideEmail({
            email,
            nombre: existVeterinario.nombre,
            token: existVeterinario.token,
        });

        return res.json({
            msg: "Hemos enviado un email con las instrucciones",
        });
    } catch (error) {
        console.log(error);
    }

    return res.status(400).json({ msg: "Contraseña" });
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });

    if (tokenValido) {
        //El usuario existe
        res.json({ msg: "Token valido y existe" });
    } else {
        const error = new Error("Token No valido");
        return res.status(400).json({ msg: error.message });
    }
};

const nuevoPassword = async (req, res) => {
    const {token} = req.params
    console.log(req.body)
    const veterinario = await Veterinario.findOne({ token });
    console.log(veterinario)
    if (!veterinario) {
        const error = new Error("Usuario no existe");
        return res.json({ msg: error.message });
    }


    //Actualizacion
    try {
        veterinario.token = null;
        veterinario.password = req.body.password;
        await veterinario.save();
        res.json({ msg: "Nuevo password Guardado" });
    } catch (error) {
        console.log('AQUIIIIi')
        console.log(error);
    }
};

const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.params.id);
    console.log(veterinario);
    if (!veterinario) {
        const error = new Error("Hubo un error");
        return res.status(400).json({ msg: error.message });
    }

    const { email } = req.body;
    console.log(email);
    console.log(veterinario.email);

    if(veterinario.email !== email) {
        const existeEmail = await Veterinario.findOne({'email': email});
        if (existeEmail) {
            const error = new Error("Email Ya existente");
            return res.status(400).json({ msg: error.message });
        }
        return
    }

    try {
        veterinario.nombre = req.body.nombre;
        veterinario.email = req.body.email;
        veterinario.telefono = req.body.telefono;
        veterinario.web = req.body.web || veterinario.web;

        const veterinarioActualizado = await veterinario.save();
        res.json(veterinarioActualizado);
    } catch (error) {
        console.log(error);
    }
};

const actualizarPassword = async (req,res) =>{
    //Obtener datos

    const {id} = req.veterinario
    const {pwd_actual, pwd_nueva} = req.body

    //Comprobar si existe el veterinario

    const veterinario = await Veterinario.findById(id);
    console.log(veterinario)

    if(await veterinario.comprobarPassword(pwd_actual)){
        
        //Almacenar Nuevo Password
        veterinario.password = pwd_nueva;
        await veterinario.save()
        res.json({msg: 'Password Almacenado correctamente'})
    }else{
        console.log('correcto2')
        const error = new Error("La contraseña actual incorrecto");
        return res.status(400).json({ msg: error.message });
    }


}

export {
    registrar,
    autenticar,
    confirmar,
    perfil,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
};
