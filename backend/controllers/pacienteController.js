import Paciente from "../models/Pacientes.js";



const agregarPacientes = async (req,res) =>{

    const paciente = new Paciente(req.body)
    console.log(paciente)
    paciente.veterinario =req.veterinario._id 
    try {
        const pacienteAlmacenado = await paciente.save()
        res.json({msg: "Paciente almacenado"})

    } catch (error) {
        console.log(error)
    }

}

const obtnerPacientes = async (req,res) =>{
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)
    console.log(pacientes)
    res.json(pacientes)
}

const eliminarPaciente = async (req,res) =>{
    const {id} = req.params
    const paciente = await Paciente.findById(id); 
    console.log(paciente)
    if(!paciente){
        return res.status(404).json({msg: "No encontrado"})
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "ACCION NO VALIDA"})
    }

    try {
        await paciente.deleteOne();
        res.json({msg: "Paciente eliminado"})

    } catch (error) {
        console.log(error)
    }

}
const actualizarPaciente = async (req,res) =>{
    const {id} = req.params
    const paciente = await Paciente.findById(id); 

    if(!paciente){
        return res.status(404).json({msg: "No encontrado"})
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "ACCION NO VALIDA"})

    }

    paciente.nombre= req.body.nombre || paciente.nombre
    paciente.nombre= req.body.propietario || paciente.propietario
    paciente.nombre= req.body.email || paciente.email
    paciente.nombre= req.body.fechaAlta || paciente.fechaAlta
    paciente.nombre= req.body.sintomas || paciente.sintomas

    
    try {
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error)
    }
}
const obtnerPaciente = async (req,res) =>{
    const {id} = req.params
    const paciente = await Paciente.findById(id);    
    console.log(paciente.veterinario._id.toString())
    console.log(req.veterinario._id.toString())
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "ACCION NO VALIDA"})
        
    }
    if(!paciente){
        return res.status(404).json({msg: "No encontrado"})
    }
    
    res.json(paciente)

}



export {
    agregarPacientes,
    obtnerPacientes,
    eliminarPaciente,
    actualizarPaciente,
    obtnerPaciente
}